import { apiSlice } from "../../apiSlice";
import {app} from "../../../services/api/endPoints";

const mq_customer=apiSlice.injectEndpoints({
    endpoints:(build)=>({
            customers:build.query({
                query:()=>
                    ({
                    url:app.customer.app_gridCustomers,
                    method:'GET'
                }),
                providesTags:['customers']
            }),
            customerSave:build.mutation({
                query:({data})=>({
                    url:app.customer.app_customerSave,
                    method:'POST',
                    data:data
                }),
                invalidatesTags:['customers']
            }),
            openCustomer:build.mutation({
                query:({data})=>({
                    url:app.customer.app_openCustomer,
                    method:'POST',
                    data:data
                })
            }),
    })
})

export const {
    useCustomersQuery,
    useCustomerSaveMutation,
    useOpenCustomerMutation
}=mq_customer