import React from 'react'
import '../button/button.css'
 function Button({icon,title,action}) {
  return (
    <section className='btn fs-10'>
        <button type="button" onClick={()=>action()}>
          <i className={`${icon}`}></i>
          <span> {title}</span>
        </button>
   </section>
    
  )
}
export default Button
