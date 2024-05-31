import {clientAPI} from './api/clientAPI';
export const axiosBaseQuery=()=> async({url,method,data})=>{
    try {
        const response=await clientAPI({url,method,data});
        return {data:response.data};
    } catch (error) {
        const err=error;
        return{
            data:err.response?.data
        }
    }

}