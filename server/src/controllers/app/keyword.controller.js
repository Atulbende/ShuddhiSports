import executeQuery from "../../database/query.js";
import { _async } from "../../utils/_async.js";
import { ApiError } from "../../utils/_error.js";
import { APIResponse  } from "../../utils/_response.js";
import { com_message, getNewObj } from "../../utils/index.js";

const getGridCategorys=_async(async(req,res)=>{
        // console.log('keywords:',req.cookies);
        // const Token= req.cookies?._sessionId;
        console.log('Token:');
        try {
                const categorys=  await executeQuery('select * from category');
                return   res.send(new APIResponse(200,"done",{data:categorys}));
        } catch (error) {
                return res.send(new ApiError(200,'Somthing went Wrong'))
        }

})
const categorySave=_async(async(req,res)=>{
        try {
                const Pid=req.body.Pid;
                const Category=req.body.Category;
                const result=await executeQuery('call CategorySave(?,?,@Per_Result)',[Category,Pid]);
                const _msg =com_message(result[0].Per_Result);
                return res.send(new APIResponse(200,"done",{result:_msg}));
        } catch (error) {
                console.log('category:',error)
        }
});
const openCategory=_async(async(req,res)=>{

        const _id=req?.body?.Pid; 
        if(_id===-1){
        const result = await  executeQuery(`SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME=? AND TABLE_SCHEMA = ?`,['category',process.env.DATABASE_NAME]);
        res.result=getNewObj(result);
        }else{
        const result = await  executeQuery(`SELECT Pid,Category FROM category WHERE Pid=?;`,[_id]);
        console.log('result:',result,_id)
        res.result=result;
     }

const requiredfields = await  executeQuery(`select FieldsArray from requiredfields where TableName=?;`,['category']);
res.required=JSON.parse(requiredfields[0].FieldsArray.replace(/'/g, '"'));
return res.send(new APIResponse(200,"loaded",{result:res.result,required:res.required}));
});

// Brands

const getGridBrands=_async(async(req,res)=>{

        try {
                const gridbrands=  await executeQuery('select * from brand');
                return   res.send(new APIResponse(200,"done",{data:gridbrands}));
        } catch (error) {
                return res.send(new ApiError(200,'Somthing went Wrong'))
        }

})
const brandSave=_async(async(req,res)=>{
        try {
                const Pid=req.body.Pid;
                const Brand=req.body.BrandName;
                const result=await executeQuery('call BrandSave(?,?,@Per_Result)',[Brand,Pid]);
                const _msg =com_message(result[0].Per_Result);
                return res.send(new APIResponse(200,"done",{result:_msg}));
        } catch (error) {
                console.log('Brand:',error)
        }
});
const openBrand=_async(async(req,res)=>{

        const _id=req?.body?.Pid; 
        if(_id===-1){
        const result = await  executeQuery(`SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME=? AND TABLE_SCHEMA = ?`,['brand',process.env.DATABASE_NAME]);
        res.result=getNewObj(result);
        }else{
        const result = await  executeQuery(`SELECT Pid,BrandName FROM brand WHERE Pid=?;`,[_id]);
        console.log('result:',result,_id)
        res.result=result;
     }

const requiredfields = await  executeQuery(`select FieldsArray from requiredfields where TableName=?;`,['brand']);
res.required=JSON.parse(requiredfields[0].FieldsArray.replace(/'/g, '"'));
return res.send(new APIResponse(200,"loaded",{result:res.result,required:res.required}));
});
export {categorySave,getGridCategorys,openCategory,getGridBrands,brandSave,openBrand};
