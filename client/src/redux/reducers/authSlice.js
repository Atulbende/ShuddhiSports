import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isLogin:false,
    accessId:null,
    refreshId:null,
    roles:[]
}
const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setToken:(state,{payload})=>{
            // state.isLogin=  payload?.isLogin
            state.accessId=payload?.token
            // state.refreshId=payload?.refreshToken
            // return state;
            // state.roles=JSON.parse(payload?.roles) 
        },
        setAuth:(state,{payload})=>{
                state.isLogin=  payload?.isLogin
                state.accessId=payload?.token
                state.refreshId=payload?.refreshToken
                state.roles=JSON.parse(payload?.roles) 
            },
        getAuth:(state,{payload})=>{
                return state;
            },
        logoutUser:(state)=>{
            state.isLogin= false;
            state.accessId=null;
            state.refreshId=null
            state.roles=[];
        }

            
    }
});

export const {setAuth,getAuth,setToken,logoutUser}=authSlice.actions;
export default authSlice.reducer;
