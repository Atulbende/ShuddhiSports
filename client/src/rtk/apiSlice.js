import {createApi} from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../services/axiosBaseQuery";
export const apiSlice=createApi({
    reducerPath:'apiSlice',
    baseQuery:axiosBaseQuery(),
    endpoints:()=>({}),
    tagTypes:['users','categorys','brands']
});