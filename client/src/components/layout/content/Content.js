import React from 'react'
import './content.scss'
import {  Outlet } from 'react-router-dom'
export default function Content() {
  return (
    <>
      <Outlet/>
    </>

  )
}
