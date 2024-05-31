import {createSlice} from '@reduxjs/toolkit';
const initialState={
    isToggle:'collaps', 
}
const uiSlice=createSlice({
    name:'ui',
    initialState,
    reducers:{
            toggleSidebar:(state,action)=>{
                state.isToggle===''?state.isToggle='collaps': state.isToggle='';
            }
    }   
});
export const {toggleSidebar} = uiSlice.actions;
export default uiSlice.reducer;