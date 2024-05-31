import React, { memo } from 'react'
import '../number-field/numberfields.css'
 function NumberFields({onChangeEvent,onSubmition,col='col-33',label,val,id,isDisabled=false}) {

  function HandleOnSubmition(e){
      if( onSubmition &&  e.keyCode===13){
          onSubmition.current.click();
      }
  }
  const  onChangeHandler=(e)=>{
    onChangeEvent((pre)=>({...pre,[e.target.id]:e.target.value}))
  }
  return (
    <div className={`slideform group-text ` + col }>
      <span className='group-text-labal'>
        <label  id={`_${id}_`} htmlFor="text">{label}</label>       
      </span>
      <input disabled={isDisabled} autocomplete="off" id={id} onChange={onChangeHandler}  onKeyUp={HandleOnSubmition} type='number' value={val}></input>
    </div>
  )
}
export default memo(NumberFields)