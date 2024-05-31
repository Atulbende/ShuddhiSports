import React from 'react'
import {Dialog,DialogHeader,DialogBody,DialogFooter} from '../../common/dialog/Dialog'
import Button from '../../common/button/Button';

export default function ConfirmationDialog({title='Confirmation',message='',btnTitle='Yes',confirmYes,confirmNo}) {
  return (
    <Dialog classes='col-25 row-25'>
    <DialogHeader >
      <i class="fa-sharp fa-solid fa-comment-dots"></i>
      <span>{title}</span>
      <span role='button' onClick={()=>{confirmNo(false)}}><i class="fa-sharp fa-regular fa-circle-xmark fs-16"></i></span>
   </DialogHeader>
          <DialogBody classes={'row-50 d-center '}>
          <span> {message}</span>
          </DialogBody>
    <DialogFooter >
      <Button icon='fa-solid fa-check' title={btnTitle} action={()=>confirmYes()}/>
      <Button icon='fa-sharp fa-solid fa-xmark' title='No' action={()=>confirmNo(false)} />
    </DialogFooter>
</Dialog>
  )
}
