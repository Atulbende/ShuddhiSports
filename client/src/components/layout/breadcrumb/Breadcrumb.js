import React from 'react'
import {NavLink, useLocation} from 'react-router-dom'
import './breadcrumb.css'
export default function Breadcrumb() {
  const location=useLocation();
  const crub=location.pathname.split('/')
              .filter((crub)=> crub!=='')
              .map((crub)=>{
               let crublink=+`/${crub}`;
                return(
                 <NavLink  key={crub} to={crublink}> <li className='bg-light'>{crub}</li></NavLink>
                )
              })
  return (
    <>
      <section className='breadcrumb'>
          <ul className='breadcrumb-item'>
               {crub}
          </ul>
      </section>
      </>
  )
}
