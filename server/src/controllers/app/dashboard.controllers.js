import executeQuery from "../../database/query.js";
import { formatDate } from "../../utils/index.js";
import { _async } from "../../utils/_async.js";
import { APIResponse } from "../../utils/_response.js";
const Dashboard=(_async(async(req,res)=>{
    const fromDate=formatDate(req.body?.fromDate);
    const toDate=formatDate(req.body?.toDate);
    const result=await executeQuery('call SP_Dashboard(?,?) ',[fromDate,toDate]);
    return res.send (new APIResponse(200,"Dashboard",{result:result}));

}))

export {Dashboard}