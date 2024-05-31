import React from 'react'
import error from  '../../../assets/images/jpg/error.jpg'
import './errorfallback.css'
export default function ErrorFallback() {
  return (
    <div className={'error'}>
        <img src={error}></img>
        <p>Somthing went wrong.clicking on refresh button!</p>
        <button className='primary' >Refresh Page</button>
    </div>
  )
}
