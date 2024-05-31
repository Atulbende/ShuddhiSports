import executeQuery from "../../database/query.js";
import { _async } from "../../utils/_async.js";
import { com_message, getNewObj } from "../../utils/index.js";
import { APIResponse  } from "../../utils/_response.js";
const getGridCustomers=_async(async(req,res)=>{
   const customersGrid=  await executeQuery('select * from get_grid_customers_vw order by CustomerName ASC;');
   return   res.send(new APIResponse(200,"Customers Grid",{customersGrid:customersGrid}));
})
const openCustomer=_async(async(req,res)=>{
   const _id=req?.body?.Pid; 
   if(_id===-1){
   const result = await  executeQuery(`SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME=? AND TABLE_SCHEMA = ?`,['customers',process.env.DATABASE_NAME]);
   res.result=getNewObj(result)
   }else{
   const result = await  executeQuery(`SELECT Pid,CustomerName,MobileNo,FullAddress,MilkType,Qty,Rate,Balance,DeliveryBy,Timing,LastPaymentDate,Status FROM customers WHERE Pid=?;`,[_id]);
   res.result=result;
}   
const requiredfields = await  executeQuery(`select FieldsArray from requiredfields where TableName=?;`,['customers']);
res.required=JSON.parse(requiredfields[0].FieldsArray.replace(/'/g, '"'));
return res.send(new APIResponse(200,"loaded",{result:res.result,required:res.required}));
})
 const CustomerSave=_async(async(req,res)=>{
try {
      const formData= req?.body;
      const result = await  executeQuery('call SP_CustomerSave(?,@Per_Result);',[JSON.stringify(formData)]);
      const _msg =com_message(result[0].Per_Result);
      return res.send(new APIResponse(200,"done",{result:_msg}));
} catch (error) {
   console.log('_error',error)
}
 })
export {CustomerSave,openCustomer,getGridCustomers}
