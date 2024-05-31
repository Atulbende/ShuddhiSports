import React from 'react'
import {  useState,useEffect } from 'react';
import { NavLink, useLocation} from 'react-router-dom';

import {Role} from '../../utils/role';
import { useSelector } from 'react-redux';
export default function SideBar({i,Lable,Link,icon,Access,subMenu}) {
  const {roles}=useSelector((state)=>state.authControls);
    const location = useLocation();
    // Access the current pathname
    const currentPath = location.pathname;
    useEffect(() => {
        // Prevent the browser's back button only during the initial load of this component
        const disableBackButton = () => {
          window.history.pushState(null, "", currentPath);
          window.onpopstate = () => {
            console.log(currentPath)
            window.history.pushState(null, "",currentPath);
          };
        };
        // Enable the browser's back button when the component unmounts
        const enableBackButton = () => {
          window.onpopstate = null;
        };
        // Call the disableBackButton function when the component mounts
        disableBackButton();
        return () => {
          // Call the enableBackButton function when the component unmounts
          enableBackButton();
        };
      }, [currentPath]);
    
    const [toggle,SetToggle]=useState(false);
    const Userrole=roles;
    const flag= Role.roleAuth(Userrole,Access);

    if(subMenu && flag) {
        return (
            <div  className={toggle ? 'menu-item open':'menu-item'} key={i} ><div onClick={()=>{SetToggle(!toggle)}} className={`sidebar-item`}><span className='icon'> <i  className={icon}></i></span><span className='sidebar-title'> {Lable}</span><i className={toggle ? 'fas fa-chevron-down':'fas fa-chevron-right'}  ></i></div>
                 <div className={`child`}>   {
                        subMenu.map((val, index) => {
                        return ( <SideBar key={index} i={index} Lable={val.title} Link={val.link} Access={val.access}  icon={val.icon}  subMenu={val.subMenu}></SideBar>)
                        })
                    } 
                    </div>       
            </div>)
    }
    else{
        return flag && (  <div className={`menu-item`}  key={i}><NavLink to={Link}   className={`sidebar-item ` }><span className='icon'> <i  className={icon}></i></span><span className='sidebar-title'> {Lable}</span></NavLink></div>);
    }
  
}
    