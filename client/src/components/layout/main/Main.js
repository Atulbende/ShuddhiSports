import React from 'react';
import Header from '../header/Header';
import SideNavbar from '../sidenav/SideNavbar';
import Content from '../content/Content';
import Breadcrumb from '../breadcrumb/Breadcrumb'
import './main.scss'

export default function Main() {
  
  return (
    <>
      <Header/>
      <section className='main d-flex'>
        <SideNavbar/>
        <section className='content'>
            <Breadcrumb/>
            <Content/> 
        </section>
      </section>
    </>
  )
}
