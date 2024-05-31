import React from 'react';
import ReactDom from 'react-dom';
import '../dialog/dialog.css';
 export function Dialog({children,classes}) {
  return ReactDom.createPortal(
    <>  
    <div className={`dialog-overlay `}>
        <div className={`dialog  ${classes}`}>
            {children}
          </div>
        </div>
    </>,document.getElementById('dialog-root')
  )
}

export function DialogHeader({children}){
  return (
        <section className='dialog-header'>
         {children}
        </section>
        )
}
export function DialogFooter({children}){
  
  return (
    <section className='dialog-footer'>
      {children}
  </section>)
}
export function DialogBody({children,classes }){
  return (
    <section className={`dialog-body ${classes}`}>
            {children }
    </section>)
}
// export function Dialogs({setX,x}){
  
//   return (
//     <>
//     <DialogHeader>
//       <i class="fa-sharp fa-solid fa-comment-dots"></i>
//       <span>Dialog</span>
//       <span role='button' onClick={()=>x=='d-flex'?setX('d-none'):setX('')}><i class="fa-sharp fa-regular fa-circle-xmark fs-16"></i></span>
//     </DialogHeader>
//     <section className='dialog-body'>
       
//        <DialogBody>
//                 <TextFields col="col-25"/>
//                 <TextFields col="col-25"/>
//                 <TextFields col="col-50"/>
//                 <TextFields col="col-50"/>
//                 <TextFields col="col-50"/>
//                 <TextFields col="col-50"/>
//                 <TextFields col="col-50"/>
//                 <TextFields col="col-50"/>
//                 <TextFields col="col-50"/>
//        </DialogBody>
//     </section>
//       <DialogFooter>
//         <Button icon='fa-solid fa-floppy-disk' title='Save' action=''/>
//         <Button icon='fa-sharp fa-solid fa-xmark' title='Cancel' action='' />
//       </DialogFooter>
//     </>)
// }
