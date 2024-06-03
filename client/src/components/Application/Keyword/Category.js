import React, { useEffect, useState } from 'react'
import { useCategorySaveMutation, useCategorysQuery, useOpenCategoryMutation } from '../../../rtk/app/keyword/mq_keyword'
import Grid from '../../common/dataTable/Grid';
import FormDialog from '../../common/form-dialog/FormDialog';
import TextFields from '../../common/text-field/TextFields';
import { root } from '../../../services/root/root';
import useEnterKeyPress from '../../../hooks/useEnterKeyPress';
export default function Category() {
    const {data,isLoading,isFetching}=useCategorysQuery();
    const [openCategory,{isLoading:isOpenCategoryLoading,isSuccess}]=useOpenCategoryMutation()
    const [categorySave]=useCategorySaveMutation();
    const [isOpen,setIsOpen]=useState(false)
    const [category,setCategory]=useState({});
    const [isRequired,setIsRequired]=useState([]);
   
    const openDialog=(recordId)=>{
        setIsOpen(true);
        root.form.load(openCategory,recordId,setCategory,setIsRequired);
    }
    const saveHandle=async()=>{
        return await root.form.DialogSave(categorySave,isRequired,category,setIsOpen);
  }
    const columns=[
        { title : 'Pid',data:'Pid',render:(data,_)=>{
          return  '<p class="link-primary" >'+  data.toString() +'0000000' +'</p>'}, 'visible' : true}, 
        { title : 'Category',data:'Category', 'visible' : true  },
        ];
        const actions=[{"title":'New',"icon":'fa fa-plus',"className":'btn-1',"action":()=>{openDialog({Pid:-1});}}];
        const activity='com_delete';
        const tableName='category';
        useEnterKeyPress(!!isOpen,'Div_Category_Selector','Btn_Category_Selector');
  return (
        <>
        {!isLoading && !isFetching && <Grid id="categorys" data={{data:data?.data?.data,columns:columns}}  redirectTo={{isDialog:true,fn:openDialog}} activity={activity} tableName={tableName} actions={actions}></Grid>}
         {!!isOpen && 
             <FormDialog id='Div_Category_Selector' title={'Category'} size={'col-50 '} btnTitle='Save' confirmYes={saveHandle} confirmNo={()=>{setIsOpen(false)}}>
                <TextFields onChangeEvent={setCategory} val={category?.Category} label='Category Name' id='Category' col='col-100' /> 
            </FormDialog>}
        </>            
)
}
