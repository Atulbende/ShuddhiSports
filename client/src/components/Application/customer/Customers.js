import {React,useState} from 'react'
import { useCustomersQuery } from '../../../rtk/app/customer/mq_customer'
import Grid from '../../common/dataTable/Grid';
import { useNavigate } from 'react-router-dom';
import { root } from '../../../services/root/root';
// import {useDailyEntrySaveMutation } from '../../../rtk/app/daily_entry/mq_daily_entry';
import ConfirmationDialog from '../../common/confirmation-dialog/ConfirmationDialog';
import DateTimePickerField from '../../common/datetimepicker/DateTimePicker';
import { Screen } from '../../common/notifications/toastify';

export default function Customers() {
    const {data,isLoading,isFetching} = useCustomersQuery();
    const Navigate=useNavigate()
    const [isConfimation,setIsConfirmation]=useState(false);
    // const [dailyEntrySave,{data:DeliveryRespose,isSuccess:isSuccessResponse}]=useDailyEntrySaveMutation();
    const [formData,setFormData]=useState({deliveryDate:new Date,data:[]});
    const redirectToNew=()=> Navigate('/customer',{state:{ Pid: -1}});
//     const DeliveryHandle=()=>{
//       dailyEntrySave(formData).then((res)=>{
//         if(res?.data?.data?.result?.id==1){
//               setIsConfirmation(false);
//               root.grid.resetGrid('customers');
//               Screen.Notification.Success(Screen.Notification.Msg.Def3,1000);

//         }
//       });
// }
  //   const DeliverySave=()=>{
  //     const SelectedData=root.grid.getSelectedData('customers');
  //     if(SelectedData.length>0)
  //       {
  //         setIsConfirmation(true);
  //         setFormData((pre)=>({...pre,data:SelectedData}));
  //       }
  //  }
    const columns=[
      { title : 'Pid',data:'Pid',render:(data,_)=>{
        return  '<p class="link-primary" >'+  data.toString() +'0000000' +'</p>'}, 'visible' : true}, 
      { title : 'Customer Name',data:'CustomerName', 'visible' : true  },
      { title : 'Mobile No',data:'MobileNo' , 'visible' : true },
      { title : 'FullAddress',data:'FullAddress', 'visible' : true  },
      { title : 'MilkType',data:'MilkType', 'visible' : true },
      { title : 'Qty',data:'Qty', 'visible' : true },
      { title : 'Rate',data:'Rate', 'visible' : true },
      { title : 'Balance',data:'Balance', 'visible' : true },
      { title : 'Delivery Boy',data:'DeliveryBy', 'visible' : true },
      { title : 'Timing',data:'Timing', 'visible' : true },
      { title : 'Last Payment Date',data:'LastPaymentDate', 'visible' : true },
      { title : 'Status',data:'Status', 'visible' : true }
      ];
    // Grid Configuration;
    const actions=[{"title":'New',"icon":'fa fa-plus',"className":'btn-1',"action":redirectToNew}];

    const redirectTo='/customer';
    const activity='com_delete';
    const tableName='customers'
  return (
   <>
       {/* <DateTimePickerField onChangeEvent={setFormData} val={formData?.deliveryDate} label='Delivery Date' id='deliveryDate' col='col-33'></DateTimePickerField> */}
       {!isLoading && !isFetching && <Grid id='customers' isReset={isFetching} actions={actions}   redirectTo={redirectTo}  data={{data:data?.data?.customersGrid,columns:columns}} activity={activity} tableName={tableName}></Grid>}
       {/* {formData?.data.length>0 && isConfimation &&(
      <ConfirmationDialog
          title={'Create Delivery'}
          message={`Are you sure to Save Delivery`}
          confirmYes={DeliveryHandle}
          confirmNo={setIsConfirmation}
      />
      )} */}
   </>
  )
}

