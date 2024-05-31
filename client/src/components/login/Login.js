import React, {  useState } from 'react'
import '../login/login.css'
import { Screen } from '../common/notifications/toastify';
import { Validation } from '../utils/login/validation';
// import {Api} from '../../services/api/clientAPI';
import { useNavigate } from 'react-router-dom';
import {useUserLoginMutation,useUserSingupMutation} from '../../rtk/login/mq_login'
import LoginButton from '../common/loginButton/LoginButton'
// import { decodeToken } from "react-jwt";
import {useDispatch} from 'react-redux';
import { setAuth } from '../../redux/reducers/authSlice';
import { setShop } from '../../redux/reducers/appSlice';
export default function Login() {
    const Dispath=useDispatch()
    const Navigate=useNavigate();
    const [userLogin,{isLoading:loginLoading}]=useUserLoginMutation();
    const [userSinup,{isLoading:singupLoading}]=useUserSingupMutation();
    const [loginAnim,setLoginAnim]=useState('');//animation login-singup
    const [signupAnim,setSignupAnim]=useState('d-none');//animation login-singup
    const loginInit={loginUserName:'',loginPassword:''};//login form
    const [Login,SetLogin]=useState(loginInit);
    const signUpInit={Signup_Email:'',Signup_UserName:'',Signup_Password:''}
    const [Signup,setSingup]=useState(signUpInit);  
    function LoginHandle(e){
        SetLogin(prev=>({...prev,[e.target.name]:e.target.value}));
    }
    function SignupsHandle(e){
        setSingup(prev=>({...prev,[e.target.name]:e.target.value}));
    }
    async function clickOnSingup(){
        setLoginAnim('login-swipright');setSignupAnim('signup-swipright');
    }
    async function clickOnLogin(){
        setLoginAnim('login-swipleft');setSignupAnim('signup-swipleft')
    }
    async  function  LoginCheck(){ 
                if(Login.loginPassword && Login.loginUserName){
                          userLogin({data:Login}).then((loginResponse)=>{
                            if(loginResponse?.data?.success===true){ 
                                Screen.Notification.Success(loginResponse?.data?.message);
                                // const a= jwt.decodeToken(loginResponse?.data?.accessTokenId)
                                // const _decodeToken = decodeToken(loginResponse?.data?.data?.accessTokenId);
                                Dispath(setAuth({"isLogin":true,"roles":loginResponse?.data?.data?.Roles,"token":loginResponse?.data?.data?.accessTokenId,"refreshToken":loginResponse?.data?.data?.refreshTokenId}));
                                Dispath(setShop({'shopId':loginResponse?.data?.data?.shopId}))
                                Navigate('/Dashboard');
                            }else{
                                Screen.Notification.Error(loginResponse?.data?.errors);
                            }
                        });
                }else{
                    Screen.Notification.Error(Screen.Notification.Msg.Def2);
                }
       
    }
    // validation for singup , call api , after 1.5 sec open login dialog 
    async  function  SignUpSave(){
        if(Validation.Valid(Signup)){
        userSinup({data:Signup}).then((singupResponse)=>{
            if(singupResponse?.data?.statusCode.toString() ==='201' && singupResponse?.data?.success === true){
                Screen.Notification.Success(singupResponse?.data?.message);
                setTimeout(()=>{
                    clickOnLogin();
                },1000);
            }else{
                Screen.Notification.Error(singupResponse?.data?.errors);
            }
        });         
       }
    }
  return (
        <div className='container imgs'>
            {/* Login page Design */}
            <div className={`login ${loginAnim}`}>
                <section className='login-title'>
                    <h1>Welcome Back </h1>
                    <span>Please login to continue...</span>
                </section>
                <section className='login-body'>
                    <h1>LOGIN</h1>                  
                    <input name="loginUserName" type='text' placeholder='User Name' autoComplete='false' onChange={LoginHandle}></input>
                    <input onKeyPress={(e)=> {if(e.key==='Enter'){LoginCheck();}}}  name="loginPassword" type='password' placeholder='Passowrd' onChange={LoginHandle}></input>
                </section>
                <section className='login-footer'>
                    {/* <button type='button' className={buttonExtend} onClick={LoginCheck} >{loginLoading ? <span class="traditional"></span>:'LOGIN'}</button> */}
                    <LoginButton title="LOGIN" classes='login-btn'clickActions={LoginCheck} loader={loginLoading}/>
                    <LoginButton title="SIGN UP" classes='sign-up-btn'clickActions={clickOnSingup} />
                    <span> <a href='www.google.com' target='_blank'>Forget Password</a></span>
                </section>
            </div>
            {/* Sign up page Design */}
            <div className={`login ${signupAnim}`}>
                <section className='login-title'>
                            <h1>SIGN UP </h1>
                            <span>Please signup to continue</span>
                        </section>
                <section className='login-body'>                 
                    <input name="Signup_Email" value={Signup.Signup_Email}  type='email' placeholder='Email' onChange={SignupsHandle}></input>
                    <input name="Signup_UserName" value={Signup.Signup_UserName} type='text' placeholder='User Name' onChange={SignupsHandle}></input>
                    <input name="Signup_Password" value={Signup.Signup_Password} type='password' placeholder='Passowrd' onChange={SignupsHandle}></input>
                </section>
                <section className='login-footer'>
                    <LoginButton title="SIGN UP" classes='sign-up-btn'clickActions={SignUpSave} loader={singupLoading} />
                    <LoginButton title="LOGIN" classes='login-btn'clickActions={clickOnLogin} />
               </section>
            </div>
          
        </div>
  )
}
