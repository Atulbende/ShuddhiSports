import React, { useEffect, useState } from 'react'
import '../dashboard/dashboard.css'

import { useGetDashboardMutation } from '../../../rtk/app/dashboard/mq_dashboard'
import DateTimePickerField from '../../common/datetimepicker/DateTimePicker';
import Button from '../../common/button/Button';
import { useDispatch } from 'react-redux';
import { apiSlice } from '../../../rtk/apiSlice';
export default function Dashboard() {
  const dispatch = useDispatch();
  useEffect(()=>{
    console.log(';OO')
    dispatch(apiSlice.util.invalidateTags(['CompanySettings']));
    dispatch(apiSlice.util.resetApiState());
  },[])
  // const initState={
  //   fromDate:new Date(),
  //   toDate:new Date()
  // }
  // const [getDashboard,{data:dashboardData,isLoading}]=useGetDashboardMutation();
  // const [formData,setFormData]=useState(initState);
  // useEffect(()=>{
  //   getDashboard(formData)
  // },[])
  // useEffect(()=>{
  //     console.log('dashboardData.Active_Customers:',dashboardData?.data?.result[0]?.Active_Customers)
  // },[dashboardData])
  // const search=()=>{
  //   getDashboard(formData);
  // }
  return (
    <>
        <div className='row'>
          {/* <DateTimePickerField onChangeEvent={setFormData} val={formData?.fromDate} label='From Date' id='fromDate' col='col-33'></DateTimePickerField>
        <DateTimePickerField onChangeEvent={setFormData} val={formData?.toDate} label='To Date' id='toDate' col='col-33'></DateTimePickerField>
        <Button icon={'fa fa-search'} title={'Search'} action={search}></Button> */}
        </div>
        <main className='row'>
        
            {/* <section className='widget-box box-1 col-33'>
            <i className="widget-icons fa fa-address-card" aria-hidden="true"></i>

                <div className='widget-content'>
                <b>{dashboardData?.data?.result[0]?.Active_Customers}</b>  
                  <p>Active Customer</p>
                 
                </div>
            </section>
            <section className='widget-box box-2 col-33'>
            <i className="widget-icons fa fa-address-card" aria-hidden="true"></i>

                <div className='widget-content'>
                <b>{dashboardData?.data?.result[0]?.Total_Sale}/-</b>  
                  <p>Total Sale</p>
                 
                </div>
            </section>
            <section className='widget-box box-3 col-33'>
            <i className="widget-icons fa fa-address-card" aria-hidden="true"></i>

                <div className='widget-content'>
                <b>{dashboardData?.data?.result[0]?.Balance}/-</b>  
                  <p>Balance</p>
                 
                </div>
            </section>
            <section className='widget-box box-4 col-33'>
            <i className="widget-icons fa fa-address-card" aria-hidden="true"></i>

                <div className='widget-content'>
                    <b>{dashboardData?.data?.result[0]?.DeActive_Customers}/-</b>  
                  <p>DeActive Customers</p>
                 
                </div>
            </section> */}
          </main>
          </>
  )
}
