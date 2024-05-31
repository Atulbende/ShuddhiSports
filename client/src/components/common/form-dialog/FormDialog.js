import React from 'react'
import {Dialog,DialogHeader,DialogBody,DialogFooter} from '../../common/dialog/Dialog'
import Button from '../../common/button/Button';

export default function FormDialog({children,title='Form',size='col-25 row-25',btnTitle='Save',confirmYes,confirmNo}) {
  return (
    <Dialog classes={size}>
    <DialogHeader >
      <i class="fa-sharp fa-solid fa-comment-dots"></i>
      <span>{title}</span>
      <span role='button' onClick={()=>{confirmNo(false)}}><i class="fa-sharp fa-regular fa-circle-xmark fs-16"></i></span>
   </DialogHeader>
          <DialogBody classes={' '}>
                  {children}
          </DialogBody>
    <DialogFooter >
      <Button icon='fa-solid fa-check' title={btnTitle} action={()=>confirmYes()}/>
      <Button icon='fa-sharp fa-solid fa-xmark' title='Cancel' action={()=>confirmNo(false)} />
    </DialogFooter>
</Dialog>
  )
}
