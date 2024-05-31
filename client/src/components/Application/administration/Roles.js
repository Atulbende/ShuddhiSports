import {useRef,React, useState, useEffect, useMemo} from 'react'
import Checkbox from '../../common/checkbox/Checkbox'
import ActionBar from '../../layout/actionbar/ActionBar'
import Dialog from '../../common/dialog/Dialog';
import { useGetRolesQuery} from '../../../rtk/login/mq_login'
import TextFields from '../../common/text-field/TextFields';
import Grid from '../../common/dataTable/Grid';
import { useNavigate } from 'react-router-dom';

import { useGetGridUsersQuery } from '../../../rtk/login/mq_login';
export default function Roles() {
  const Navigate=useNavigate();
  const {data,isLoading,isFetching} =   useGetGridUsersQuery({ refetchOnMount:true })
  const redirectToNew=()=> Navigate('/Role',{state:{ Pid: -1}});
  const columns=[
    { title : 'Pid',data:'Pid',render:(data,type)=>{
      return  '<p class="link-primary" >'+  data.toString() +'0000000' +'</p>'}, 'visible' : true}, 
    { title : 'Email',data:'Email', 'visible' : true  },
    { title : 'Roles',data:'Roles' , 'visible' : false },
    { title : 'User Name',data:'UserName', 'visible' : true },
    { title : 'Status',data:'Status', 'visible' : true }
    ];
  // Grid Configuration;
  const actions=[{"title":'New',"icon":'fa fa-plus',"className":'btn-1',"action":redirectToNew}];
  const redirectTo='/Role';
  const activity='com_delete';
  const tableName='com_users'
  return (
    <>
      {!isLoading && <Grid id='users' actions={actions}   redirectTo={redirectTo}  data={{data:data?.data?.usersGrids,columns:columns}} activity={activity} tableName={tableName}></Grid>}
    </>
  )
  
}
