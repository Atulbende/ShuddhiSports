import React, { useMemo } from 'react'
import Select from 'react-select'
import '../select-field/selectfields.css'
import {colourStyles} from './style.js'
import {useCommonListQuery} from '../../../rtk/common/common.js'
export default function SelectFields({id,onChangeEvent,listKey,options=[],label,col,val,isDisabled=false}) {
const { data: listData,isLoading } =  useCommonListQuery(listKey,{skip:!listKey?true:false});
  const list=useMemo(()=>{
    if(!!listKey && !isLoading){
      return listData?.data?.list;
    }else{
      return options;
    }
  },[listKey,options,listData])
  const optionValue=useMemo(()=>{
    if(!!options && !listKey){
    const a = options.find((_v)=>_v.value===val);
    return a;
  }else{
    const a = list.find((_v)=>_v.value===val);
    return a;
  }
  },[val]);
const onChangeHandle=(e)=>{
  onChangeEvent((pre)=>({...pre,[id]:e?.value}))
}

  return (
    <div className={`group-select ${col}` } >
      <span className='group-select-labal'>
        <label id={`_${id}_`} htmlFor="select">{label}</label>
      </span>
      <Select isDisabled={isDisabled} id={id} onChange={onChangeHandle} isClearable styles={colourStyles} defaultValue={'--Select--'} options={list} value={optionValue}/>
    </div>
  )
}
