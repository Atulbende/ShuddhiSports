import { apiSlice } from "../../apiSlice";
import { app } from "../../../services/api/endPoints";

const mq_dashboard=apiSlice.injectEndpoints(({
    endpoints:(build)=>({
        getDashboard:build.mutation({
            query:(data)=>({
                url:app.getDashboard,
                method:'POST',
                data:data
            })
        }),
    })
}))

export const {useGetDashboardMutation}=mq_dashboard