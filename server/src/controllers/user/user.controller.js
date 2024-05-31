import {_async} from '../../utils/_async.js'
import executeQuery  from '../../database/query.js';
import bcrypt from 'bcrypt';
import {ApiError} from '../../utils/_error.js'
import {APIResponse} from '../../utils/_response.js'
import {JWTServices}  from '../../services/JWTServices.js';
import { CookiesOptions } from '../../config/cookiesConfig.js';
import { getNewObj,com_message } from '../../utils/index.js';
// Sample Request Data
// Signup_Email: 'atul.bende@gmail.co',
// Signup_UserName: 'atul400',
// Signup_Password: 'Atul@410'

// User SignUp
const userSinghUp = _async(async(req,res)=>{    
    try {
        console.log('P:',req)
        const _Login_Password=req.body?.Signup_Password.toString();
                    bcrypt.hash(_Login_Password,10,async(err,hashPassword)=>{
                        if(!!hashPassword){
                            setTimeout(async()=>{
                            const result = await  executeQuery('call SignupSave(?,?,?,@Per_Result);',[req.body.Signup_Email,req.body.Signup_UserName,hashPassword])
                            if(result[0].Per_Result=='-1'){
                                res.status(404).json(new ApiError(404,'data',"Record not found",false,result[0].Per_Result));
                            }else if(result[0].Per_Result=='1'){
                                res.status(201).json(new APIResponse(201,"Singup successfully please contact admin"));
                            }
                        },2300);
                        }else{
                            // return APIError();
                            res.status(404).json(new ApiError(404,'Encrption error ',err,false,result[0].Per_Result));
                                
                        }   
                    
                    });
        } catch (error) {
            res.status(405).json( new ApiError(405,error));
        }
           });
        //Check user Name and password
const userLogin = _async(async(req,res)=>{
        try {
            console.log('red:',req);
        //Getting User Data from database using SP,
        const result = await  executeQuery('call LoginCheck(?,@Per_Password,@Per_Roles,@Per_Status,@Per_UserId,@Per_RefreshToken);',[req.body.loginUserName]);
        // stroing statubs,id role encrypted password string 
        const varStatus=result[0]?.Per_Status;
        const varUserId=result[0]?.Per_UserId;
        const varRoles=result[0]?.Per_Roles;
        const varPassword=req.body?.loginPassword;
        const resPassword=result[0]?.Per_Password;
        const curRefreshTokon=result[0]?.Per_RefreshToken;
        const RefreshToken = req.cookies?._sessionRId;
        // If user not found then return  402
        if(resPassword==='-1' || !resPassword) return res.status(404).json(new ApiError(404,false,"User Not Register"));
        // If user not Active then return 402
       
        if(varStatus!=='Active') return   res.status(401).json (new ApiError(401,false,"User Not Active Please Contact Admin"));
        // Compire password encrypted passowrd    
        bcrypt.compare(varPassword,resPassword,async(err,hashPassword)=>{
            // If password succussfull compire and status is active then create token 
                  if(hashPassword && varStatus==='Active'){
                    // Check refresh Token and AccessToken
                     if(!!req.cookies?._sessionRId && req.cookies?._sessionRId === curRefreshTokon){
                          const accessToken= await JWTServices.generateAccessToken({userId:varUserId,userName:req.body.loginUserName});
                        res.cookie('_sessionId',accessToken,CookiesOptions)
                        // return [accessToken];
                        return   res.send(new APIResponse(200,"Login Succussfully!",{Roles:varRoles,accessTokenId:accessToken,refreshTokenId:RefreshToken}));
        
                     }else{
                       const [accessToken,refreshToken]=  await JWTServices.generateRefreshAccessToken({userId:varUserId,userName:req.body.loginUserName});
                       res.cookie('_sessionId',accessToken,CookiesOptions)
                       res.cookie('_sessionRId',refreshToken,CookiesOptions)
                    //    const getRefreshResponse = await  executeQuery('call UserRefreshTokenUpdate(?,?,@Per_Result);',[varUserId,refreshToken]);
                       return   res.send(new APIResponse(200,"Login Succussfully!",{Roles:varRoles,accessTokenId:accessToken,refreshTokenId:refreshToken}));
                    //    return [accessToken,refreshToken];
                     }
                //    const [accessToken,refreshToken]=await JWTServices.generateRefreshAccessToken(req.body.loginUserName);
                    // Store refresh Token in user database 
                     // if Refresh Token is store successfully then return 200 and return role m Access token   
                //    if(getRefreshResponse[0]?.Per_Result==="200"){
                //       }else{
                //       }
                    // if password not correct
                  }else{
                    return   res.status(402).json(new ApiError(402,false,"Please Enter Correct Password"));
                  }
                    
                });
        } catch (error) {
            console.log("erro:",error);
            res.send( new ApiError(409,error));
            
        }
           
});

const userLogOut =_async(async(req,res)=>{       
      const result=await  executeQuery('call logout(?,@Per_isLogout)',[req?.userId]);
        if(result[0].Per_isLogout){
          res.clearCookie('_sessionId',CookiesOptions).clearCookie('_sessionRId',CookiesOptions)
         .send(new APIResponse(204,"Logout successfully"));
        }else{
        res.send(new APIResponse(204,"user not Exists "));   
        }
});
const refreshSession = _async(async(req,res)=>{
    const userData=  await executeQuery('select * from com_users where RefreshToken=?',[req.body.refreshToken]);
 
    if(userData[0]?.RefreshToken===req.cookies?._sessionRId){
        const accessToken= await JWTServices.generateAccessToken({userId:userData[0]?.Pid,userName:userData[0]?.UserName});
        res.clearCookie('_sessionId',CookiesOptions)
        res.cookie('_sessionId',accessToken,CookiesOptions)
       return  res.send(new APIResponse(205,"Token Refreshed",{accessTokenId:accessToken}));
    }else{
        return  res.send(new APIResponse(206,"Some Other Person LoginedIn!"));
    }
})
// user Role Save
const getRoles=_async(async(req,res)=>{
    try {
        const rolesArray=  await executeQuery('select * from get_role_vw') || [];
            return      res.send(new APIResponse(200,"Roles list",{rolesArray:rolesArray}));
    } catch (error) {
        console.log('getRoles:',error);
    }
    
})
const getGridUsers=_async(async(req,res)=>{
    const usersGrids=  await executeQuery('select * from get_grid_user_vw') || [];
    return      res.send(new APIResponse(200,"users Grid",{usersGrids:usersGrids}));
})

const openUser=_async(async(req,res)=>{
    console.log('reqs:',req)

        const _id=req?.body?.Pid; 
        // const user=  await executeQuery('select * from get_grid_user_vw where') || [];
        // const result=await  executeQuery('call open_record(?,?,@Per_Result);',[]);
        if(_id===-1){
        const result = await  executeQuery(`SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME=?;`,['com_users']);
        res.result=getNewObj(result)
        }else{
        const result = await  executeQuery(`SELECT Pid,Email,UserName,Status,Roles FROM com_users WHERE Pid=?;`,[_id]);
        res.result=result;
    }   
    const requiredfields = await  executeQuery(`select FieldsArray from requiredfields where TableName=?;`,['com_users']);
    res.required=JSON.parse(requiredfields[0].FieldsArray.replace(/'/g, '"'));
    return res.send(new APIResponse(200,"loaded",{result:res.result,required:res.required}));
})
const saveUser=_async(async(req,res)=>{
    const result = await  executeQuery('call UserSave(?,@Per_Result);',[JSON.stringify(req.body)]);
    console.log('red:',result);

    const _msg =com_message(result[0].Per_Result);
    return res.send(new APIResponse(200,"loaded",{result:_msg}));
})
export {userSinghUp,userLogin,userLogOut,refreshSession,getRoles,getGridUsers,openUser,saveUser}
