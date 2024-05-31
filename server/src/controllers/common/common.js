import executeQuery from "../../database/query.js";
import { _async } from "../../utils/_async.js";
import { ApiError } from "../../utils/_error.js";
import { APIResponse  } from "../../utils/_response.js";
import {lists} from '../../database/tables.js'
const com_delete=_async(async(req,res)=>{
        try {
                let id=req.body.id.toString();
                const result=await executeQuery(`call ${req.body.activity}(?, ?,@Per_Result)`,[id,req.body.table]);
                console.log('result:',result[0]);
                return res.send(new APIResponse(200,"loaded",{result:result[0]?.Per_Result}));
        } catch (error) {
                console.log('com_delete:',error);        
        }       
});
const com_list=_async(async(req,res)=>{
        try {
                // console.log('com_list::',req?.query.key);
                
                const viewName=(lists.find((value,index)=>value?.key===req?.query?.key))?.view;
                const parentTableName=req?.query?.parent;
                const parentId=req?.query?.parentId;
                const query= !!parentTableName && !!parentId?`select * from ${viewName} where ${parentTableName}=${parentId}`:`select * from ${viewName}`;
                const listArray=await executeQuery(query);
                return   res.send(new APIResponse(200,"list",{list:listArray}));


        } catch (error) {
                console.log('com_list:',error);        
        }
})
export {com_delete,com_list};
