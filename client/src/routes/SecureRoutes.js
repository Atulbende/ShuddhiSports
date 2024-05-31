import React, {  useEffect } from 'react'
import { GerRouter } from '../components/layout/sidenav/MenuList'
import ActionBar from '../components/layout/actionbar/ActionBar'
import SideNavbar from '../components/layout/sidenav/SideNavbar'
import Header from '../components/layout/header/Header'
import Content from '../components/layout/content/Content'
import Breadcrumb from '../components/layout/breadcrumb/Breadcrumb'
import Login from '../components/login/Login'
import { useSelector } from 'react-redux';
import Main from '../components/layout/main/Main';
import { Routes,Route, useNavigate } from 'react-router-dom'
export default function SecureRoutes() {
  const Navigate=useNavigate()
  const {roles}=useSelector((state)=>state.authControls);
  const {isLogin,accessId}=useSelector((state)=> state.authControls);
  const Routers= GerRouter(roles);
  useEffect(()=>{
    if(!isLogin && !accessId){
        Navigate('/login');
    }
  },[accessId,isLogin])
  return (
        <Routes>
            <Route path='/' element={<Main/>}>
                <Route   path='/header' element={<Header/>}/> 
                <Route   path='/sidenavbar' element={<SideNavbar/>}/> 
                <Route   path='/breadcrumb' element={<Breadcrumb/>}/> 
                <Route   path='/content' element={<Content/>}/> 
                <Route   path='/actionBar' element={<ActionBar/>}/>
                {Routers.map((val,key)=>{return <Route key={val.link}  path={val.link} element={val.component}/> })}
            </Route>
            <Route   path='/login' element={<Login/>}/>
           
          </Routes>
         
       
  )
}
