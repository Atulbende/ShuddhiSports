import React from 'react'
import '../button/button.css'
 function Button({icon,id,title,action}) {
  return (
    <section className='btn fs-10'>
        <button id={id} type="button" onClick={()=>action()}>
          <i className={`${icon}`}></i>
          <span> {title}</span>
        </button>
   </section>
    
  )
}
export default Button
