import React, { useMemo } from 'react';
import  './sidebar.scss';
import { Menu } from './MenuList';
import { useSelector } from 'react-redux';
import SideBar from '../sidenav/SideBar';
export default function SideNavbar() {
  const toggleSidebar=useSelector((state)=> state.uiControls.isToggle);
  const SideBarContent= useMemo(()=>{
    return Menu.map((val, index) => {
      return (<SideBar  key={index} i={index} Lable={val.title} Link={val.link} icon={val.icon} Access={val.access}  subMenu={val.subMenu}></SideBar>);
   })
  },[])
  return (
    <div className={`sidebar  ${toggleSidebar}`}>  
        {SideBarContent}
    </div>
  )
}

// {Menu.map((val, i) => {
//   return (val.visible) ? (<li key={i}><div className='sidebar-item '><NavLink to={val.link}><span className={val.icon}></span> {val.title}</NavLink></div></li>) : '';
// })
// }
// <li><div className='sidebar-item'><span ><i className="fas fa-chart-line sidebar-icon"></i></span><span className='sidebar-title'>Dashboard</span></div></li>
// <li><div className='sidebar-item'><span><i className="fas fa-chart-line sidebar-icon"></i></span><span className='sidebar-title'>Keywords</span><i className="fas fa-chevron-right"></i></div>
//   <ul className='ul-1'>
//       <li><div className='sidebar-item'><span><i className=" sidebar-icon"></i></span><span className='sidebar-title'>Add Item</span></div></li>
//       <li><div className='sidebar-item'><span><i className=" sidebar-icon"></i></span><span className='sidebar-title'>Add Category</span></div></li>
//   </ul>    
// </li> 


// import React, { useEffect, useState } from 'react';
// import  './sidebar.scss';
// import { useNavigate, NavLink } from 'react-router-dom';
// import { Menu } from './MenuList';
// import { useSelector } from 'react-redux';
// export default function SideNavbar() {
//   const toggleSidebar=useSelector((state)=> state.uiControls.isToggle);
//   const [IsActive,SetIsActive]=useState('');
//   return (
//     <div className={`sidebar  ${toggleSidebar}`}>  
//         <ul className='ul-0'>
//         {Menu.map((val, i) => {
//                 return (val.visible) ? (<NavLink to={val.link}><li key={i} onClick={()=>{SetIsActive(val)}}><div className={`sidebar-item ${IsActive==val && `MenuActive`}`}><span> <i  className={val.icon}></i></span><span className='sidebar-title'> {val.title}</span></div></li></NavLink>) : '';
//               })
//               }
           
//         </ul>
//     </div>
//   )
// }
