import React, { useEffect, useState } from 'react'
import { useCustomerSaveMutation, useOpenCustomerMutation } from '../../../rtk/app/customer/mq_customer';
import { root } from '../../../services/root/root';
import {  useLocation, useNavigate } from 'react-router-dom';
import ActionBar from '../../layout/actionbar/ActionBar';
import TextFields from '../../common/text-field/TextFields';
import NumberFields from '../../common/number-field/NumberFields';

import SelectFields from '../../common/select-field/SelectFields';
import DateTimePickerField from '../../common/datetimepicker/DateTimePicker';

export default function Customer() {
const [openCustomer]=useOpenCustomerMutation();
const [customerSave]=useCustomerSaveMutation();
const Navigate=useNavigate()
const [customer,setCustomer]=useState({});
const [isRequired,setIsRequired]=useState([]);
const {state:recordId}= useLocation();
const saveHandle=async()=>{
      return await root.form.save(customerSave,isRequired,customer);
}
useEffect(()=>{
  if(!recordId) Navigate('/Customers');
    root.form.load(openCustomer,recordId,setCustomer,setIsRequired);
  },[recordId])
const Statusoptions = [{ value: 'Active', label: 'Active' },{ value: 'DeActive', label: 'DeActive' }];
const Timingoptions = [{ value: 'Morning', label: 'Morning' },{ value: 'Afternoon', label: 'Afternoon' },{ value: 'Evening', label: 'Evening' }];
const MilkTypeOptoins = [{ value: 'Cow', label: 'Cow' },{ value: 'Buffalo', label: 'Buffalo' }];

const actions=[{"title":'Save',"icon":'fa fa-check',"className":'btn-1',"action":saveHandle}];
  return ( 
    <>
      <ActionBar type={'Form'} actionsButton={actions}/>
      <div  className='content-form'><br/>
      <TextFields onChangeEvent={setCustomer} val={customer?.CustomerName} label='Customer Name' id={'CustomerName'} col='col-33'/> 
      <TextFields onChangeEvent={setCustomer} val={customer?.MobileNo} label='Mobile No' id='MobileNo' col='col-33'/> 
      <TextFields onChangeEvent={setCustomer} val={customer?.FullAddress} label='Full Address' id='FullAddress' col='col-33'/> 
      <section className="divider col-100" >Purchase Details</section>
      <NumberFields onChangeEvent={setCustomer} val={customer?.Qty} label='Qty' id='Qty' col='col-33'/> 
      <NumberFields onChangeEvent={setCustomer} val={customer?.Rate} label='Rate' id='Rate' col='col-33'/> 
      <NumberFields  onChangeEvent={setCustomer} val={customer?.Balance} label='Balance' id='Balance' col='col-33'/> 
      <SelectFields onChangeEvent={setCustomer}  val={customer?.MilkType} options={MilkTypeOptoins} label='MilkType' id='MilkType' col='col-50'></SelectFields>
      <SelectFields onChangeEvent={setCustomer}  val={customer?.Timing} options={Timingoptions} label='Timing' id='Timing' col='col-50'></SelectFields>
      <SelectFields  onChangeEvent={setCustomer}  val={customer?.DeliveryBy} listKey='users' label='Delivery Boy' id='DeliveryBy' col='col-33'></SelectFields>
      <DateTimePickerField  onChangeEvent={setCustomer} val={customer?.LastPaymentDate} label='Last Payment Date' id='LastPaymentDate' col='col-33'></DateTimePickerField>
      <SelectFields onChangeEvent={setCustomer}  val={customer?.Status} options={Statusoptions} label='Status' id='Status' col='col-33'></SelectFields>
   
    </div>
    </>
  )
}
