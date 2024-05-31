import {createSlice} from '@reduxjs/toolkit';
const initialState={
    shopId:0, 
}
const appSlice=createSlice({
    name:'app',
    initialState,
    reducers:{
            setShop:(state,action)=>{
                state.shopId= action.payload.shopId || 1;
            }
    }   
});
export const {setShop} = appSlice.actions;
export default appSlice.reducer;