import React from 'react'
import './radiobutton.css'
export default function ({label,val,isChecked,fn}) {
  return (
    <div className='rd-box' >
      <label className='radio-btn'>
            <input  className='radio-input' type='radio' value={val} onChange={(e)=>{fn(e)}} checked={isChecked}/>
                    <span>
                        {label}
                    </span>
        </label>
    </div>
  )
}
