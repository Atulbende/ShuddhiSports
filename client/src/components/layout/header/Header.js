import React, {  useState } from 'react';
import {toggleSidebar} from '../../../redux/reducers/uiSlice';
import {useDispatch,useSelector} from 'react-redux';
import {Dialog,DialogHeader,DialogBody,DialogFooter} from '../../common/dialog/Dialog'
import { Screen } from '../../common/notifications/toastify';
import Button from '../../common/button/Button';
import './header.css'
import { useNavigate } from 'react-router-dom';
import RadioButton from '../../common/radioButton/RadioButton';
import { useUserLogoutMutation } from '../../../rtk/login/mq_login';
import { logoutUser } from '../../../redux/reducers/authSlice';
import { setShop } from '../../../redux/reducers/appSlice';
export default function Header() {
  const navigate=useNavigate()
  const [toggleIcon,setToggleIcon]=useState('fa-solid fa-bars');
  const [isSetting,setIsSetting]=useState(false);
  const [UserLogout]=useUserLogoutMutation();
  const Dispatch=useDispatch();
  const {shopId}=useSelector((state)=>state.appControls);
  const [IsPopup,SetIsPopup]=useState(false);
  const [IsShopPopup,SetIsShopPopup]=useState(false);
  const handleToggle=()=>{
    Dispatch(toggleSidebar());
    setToggleIcon(toggleIcon==='fa-solid fa-bars'?'fa-sharp fa-solid fa-xmark fa-fade':'fa-solid fa-bars');
  }
  const handleShopBtn=(id)=>{
    Dispatch(setShop({'shopId':id}));
    window.location.reload();
  }
  const logout=async()=>{
    const var_IsLogout= await UserLogout();
    navigate('/login')
    if(var_IsLogout?.data?.statusCode===204 || var_IsLogout?.data?.statusCode===403){
        Dispatch(logoutUser()).then
        (()=>{
          navigate('/login')
        });
    }
  }
  return (
    <>
        <nav className="top-nav ">
            <div id='start' role="button" ><div  className='bars' onClick={()=>handleToggle()}><span className='bars-circle' ><i className={toggleIcon}></i></span></div><span className='start-title'><a href='#'>Dashboard</a></span>
            <i className={'fa fa-cubes shop'} role='button' onClick={()=>{SetIsShopPopup(!IsShopPopup);}}>
                    <div className={`shop-popup-menu ${IsShopPopup?'':'d-none'}`} >
                        <ul>
                            <li className={`${shopId===1?'shop-selected':''}`}><a href='#'  onClick={()=>{handleShopBtn(1)}}><i className="fa fa-shopping-bag"></i><span className='menu-title'> Shop-1</span></a></li>
                            <li className={`${shopId===2?'shop-selected':''}`}><a href='#' onClick={()=>{handleShopBtn(2)}}><i className="fa fa-shopping-bag"></i><span className='menu-title'> Shop-2</span></a></li>  
                        </ul>
                    </div>
              
              </i></div>
            <div id='end' role="button"  onClick={()=>{SetIsPopup(!IsPopup);}} ><a href='#'><span><i className="fa fa-user-circle fa-3x"></i></span></a></div>
           
            <div className={`popup-menu ${IsPopup?``:`d-none`}`} >
              
              <ul>
                <li><a href='#'><i className="fa fa-user"></i><span className='menu-title'> Profile</span></a></li>
                <li><a href='#' onClick={()=>{setIsSetting(!isSetting);SetIsPopup(!IsPopup);}}><i className="fa fa-cog"></i><span className='menu-title'> Setting</span></a></li>  
                <li><a href='#'><i className="fa fa-sticky-note"></i><span className='menu-title'> Note</span></a></li>
                <li onClick={()=>logout()}><a href='#'><i className="fa fa-power-off" ></i><span className='menu-title'> Logout</span></a></li>
              </ul> 
            </div>
        </nav>
        {/* Click on Setting Start*/}
                  {isSetting ?(<Themes Close={setIsSetting}/>):null}
        {/* Click on Setting End*/}
    </>
    )
}
export function Themes({Close}){ 
  const activeTheme=localStorage.getItem('theme')
  const [theme,setTheme]=useState(activeTheme);
  const changesTheme=(e)=>{
    e.target.value==='good-morning'?Screen.morning():Screen.night();
    setTheme(e.target.value);
  }
  // (function(){
  //   theme==='good-morning'?Screen.morning():Screen.night();
  // }())
    return(
    <>
        <Dialog classes='col-25 row-25'>
            <DialogHeader >
              <i class="fa-sharp fa-solid fa-comment-dots"></i>
              <span>Dialog</span>
              <span role='button' onClick={()=>{Close(false)}}><i class="fa-sharp fa-regular fa-circle-xmark fs-16"></i></span>
           </DialogHeader>
                  <DialogBody classes={'row-50 d-center '}>
                    <RadioButton id={'good-morning'} val={'good-morning'} fn={changesTheme} label={'Good Morning'} isChecked={theme==='good-morning'}></RadioButton>
                    <RadioButton id={'good-afternoon'} val={'good-afternoon'} fn={changesTheme} label={'Good Afternoon'}   isChecked={theme==='good-afternoon'}></RadioButton>
                    {/* <RadioButton id={'good-evening'} val={'good-evening'} fn={changesTheme} label={'Good Evening'}   isChecked={theme==='good-evening'}></RadioButton> */}
        
                  </DialogBody>
            <DialogFooter >
              {/* <Button icon='fa-solid fa-floppy-disk' title='Save' action=''/> */}
              <Button icon='fa-sharp fa-solid fa-xmark' title='Close' action='' />
            </DialogFooter>
        </Dialog>
    </>)
}
