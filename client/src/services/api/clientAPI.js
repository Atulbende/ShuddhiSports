
import Axios from 'axios';
import { Screen } from '../../components/common/notifications/toastify';
import {setToken,logoutUser}  from '../../redux/reducers/authSlice';
export const baseURL=`${process.env.REACT_APP_DASHBOARD_APP_API_BASEURL}`;
// Create an instance of Axios with a base URL
Axios.defaults.withCredentials = true
const clientAPI = Axios.create({
      withCredentials: true,
      baseURL: baseURL,
      timeout:20000,    
    });

const axiosMiddleware = ({ dispatch, getState }) => next => async action => {    
      clientAPI.interceptors.request.use(function async(config) {
            const currentState = getState();
            Screen.LoaderON();
            console.log('currentState:',currentState?.appControls?.shopId);
            const accessId=currentState.authControls.accessId;
            config.headers["Authorization"] = `Bearer ${accessId}`;
            // if (!!currentState?.appControls?.shopId>0) {
            //       config.headers["AppId"]= currentState?.appControls?.shopId || 0;
            // }
            return config;
      }, function (error) {
            return Promise.reject(error);
      });
      clientAPI.interceptors.response.use(function  (response) {
            Screen.LoaderOff();
            return response;
      }, async function (error)  {   
            const currentState = getState();
            const refreshId=currentState.authControls.refreshId;
            if(error?.response?.data?.statusCode===403 && error?.response?.data?.errors.toString().trim()==='Token Expired'){
                  const res=await Axios.post(`${baseURL}user/refreshSession`,{refreshToken:refreshId});
                  if(res?.data?.statusCode===205 && res?.data?.message==='Token Refreshed'){
                        dispatch(setToken({'token':res?.data?.data?.accessTokenId}));
                        return clientAPI.request(error.config); 
                  }else if(res?.data?.statusCode===206 && res?.data?.message==='Some Other Person LoginedIn!') {
                        Screen.Notification.Error(res?.data?.message);
                        dispatch(logoutUser());
                        return
                  }
            }else if(error?.response?.data?.statusCode===403 && error?.response?.data?.errors.toString().trim()==='Refresh Token Expired'){
                  Screen.Notification.Error(error?.response?.data?.errors.toString().trim());
                  dispatch(logoutUser())
                  return
            }else{
                  Screen.Notification.Error(error?.response?.data?.errors.toString().trim());
                  dispatch(logoutUser())
                  return
            }
            return Promise.reject(error);
      });
return next(action);
};
// export const Api= async(method,url,data,res)=>{ 
// if(method=='GET') 
// await  clientAPI.get(url,data).then((response)=>{
//   res= {...response};
// }) .catch((error) => { console.log(error);});
// else if(method=='POST')
// await  clientAPI.post(url,data).then((response)=>{
//   res= {...response};}) .catch((error) => {
//      console.log(error);
// });     
// return res;
// }
export {clientAPI , axiosMiddleware};
// export default axiosMiddleware;

// export  LoadGrids;
// module.export Api();
