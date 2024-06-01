import React, { useState } from 'react'
import { useSizeSaveMutation, useSizesQuery, useOpenSizeMutation } from '../../../rtk/app/keyword/mq_keyword'
import Grid from '../../common/dataTable/Grid';
import FormDialog from '../../common/form-dialog/FormDialog';
import TextFields from '../../common/text-field/TextFields';
import { root } from '../../../services/root/root';

export default function Size() {
    const {data,isLoading,isFetching}=useSizesQuery();
    const [openSize,{isLoading:isOpenSizeLoading,isSuccess}]=useOpenSizeMutation()
    const [sizeSave]=useSizeSaveMutation();
    const [isOpen,setIsOpen]=useState(false)
    const [size,setSize]=useState({});
    const [isRequired,setIsRequired]=useState([]);
   
    const openDialog=(recordId)=>{
        setIsOpen(true);
        root.form.load(openSize,recordId,setSize,setIsRequired);
    }
    const saveHandle=async()=>{
        return await root.form.DialogSave(sizeSave,isRequired,size,setIsOpen);
  }
    const columns=[
        { title : 'Pid',data:'Pid',render:(data,_)=>{
          return  '<p class="link-primary" >'+  data.toString() +'0000000' +'</p>'}, 'visible' : true}, 
        { title : 'Size',data:'Size', 'visible' : true  },
        ];
        const actions=[{"title":'New',"icon":'fa fa-plus',"className":'btn-1',"action":()=>{openDialog({Pid:-1});}}];
        const activity='com_delete';
        const tableName='size';
  return (
        <>
        {!isLoading && !isFetching && <Grid id="sizes" data={{data:data?.data?.data,columns:columns}}  redirectTo={{isDialog:true,fn:openDialog}} activity={activity} tableName={tableName} actions={actions}></Grid>}
         {!!isOpen && 
             <FormDialog title={'Size'} size={'col-50 '} btnTitle='Save' confirmYes={saveHandle} confirmNo={()=>{setIsOpen(false)}}>
                <TextFields onChangeEvent={setSize} val={size?.Size} label='Size Name' id='Size' col='col-100' /> 
            </FormDialog>}
        </>            
)
}
