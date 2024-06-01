import { apiSlice } from "../apiSlice";
import { common } from "../../services/api/endPoints";
const mq_common=apiSlice.injectEndpoints({
    endpoints:(build)=>({
        comDelete:build.mutation({
                query:({data})=>({
                    url:common.com_delete,
                    method:'POST',
                    data:data
                }),
                invalidatesTags:['users','customers','categorys','brands','sizes']
            }),
        commonList:build.query({
            query:(_key)=>
                {
                return({ url:`${common.com_list}?key=${_key}`,
                method:'GET'
            })}
        }),
    })
    // endpoints:(build)=>({
    //     userLogin:build.mutation({
    //         query:({data})=>({
    //             url:user.user_login,
    //             method:'POST',
    //             data:data
    //         })
    //     }),
    //     UserSingup:build.mutation({
    //         query:({data})=>({
    //             url:user.user_singup,
    //             method:'POST',
    //             data:data
    //         })
    //     })
    // })
})

export  const {useComDeleteMutation,useCommonListQuery}=mq_common;
