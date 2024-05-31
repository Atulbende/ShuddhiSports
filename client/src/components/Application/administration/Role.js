import {useRef,React, useState, useEffect, useCallback} from 'react'
import Checkbox from '../../common/checkbox/Checkbox'
import ActionBar from '../../layout/actionbar/ActionBar'
import Dialog from '../../common/dialog/Dialog';
import { useGetRolesQuery, useOpenUserMutation, useSaveUserMutation} from '../../../rtk/login/mq_login'
import TextFields from '../../common/text-field/TextFields';
import SelectFields from '../../common/select-field/SelectFields';
import { useLocation } from 'react-router-dom';
import { root } from '../../../services/root/root';
export default function Role() {
  const { data:RoleList, error, isLoading }  =useGetRolesQuery();
  const [OpenUser]= useOpenUserMutation();
  const [saveUser]=useSaveUserMutation();
  const [user,setUser]=useState({});
  const [isRequired,setIsRequired]=useState([]);
  const {state:recordId}= useLocation();
  
  const saveHandle=async()=>{
    console.log('user:',user);
    return await root.form.save(saveUser,isRequired,user);
}
  useEffect(()=>{
    if(!isLoading){
     root.form.load(OpenUser,recordId,setUser,setIsRequired);
    }
  },[recordId,isLoading])
 const options = [{ value: 'Active', label: 'Active' },{ value: 'DeActive', label: 'DeActive' }];
 const actions=[{"title":'Save',"icon":'fa fa-check',"className":'btn-1',"action":saveHandle}];
  return (
    <>
      <ActionBar type={'Form'} actionsButton={actions}/>
          <div  className='content-form'><br/>
            <TextFields onChangeEvent={setUser} val={user?.UserName} label='User Name' id={'UserName'} col={'col-33'}/> 
            <TextFields onChangeEvent={setUser}val={user?.Email} label='Email' id='Email' col='col-33'/> 
            <SelectFields onChangeEvent={setUser}  val={user?.Status} options={options} label='Status' id='Status' col='col-33'></SelectFields>
            <section className="divider col-100" >User Roles</section>
            <Checkbox onChangeEvent={setUser} list={RoleList?.data?.rolesArray} value={user?.Roles} id='Roles' col={'col-15'}></Checkbox>
          </div>
          </>
  )
}
