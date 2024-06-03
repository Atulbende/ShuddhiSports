import {useEffect} from 'react';
export default function useEnterKeyPress(dependency,divSelector,BtnSelector){
    useEffect(()=>{
        const enterPress=(e)=>{
            if(divSelector && e.keyCode===13 && e.key=='Enter'){
                const buttonClick=document.getElementById(BtnSelector);
                buttonClick.click();
            }
        }
            if(dependency){
                const _devSelector=document.getElementById(divSelector);
                if(_devSelector){
                    document.getElementById(divSelector).focus();
                    _devSelector.addEventListener('keyup',enterPress);
                    return ()=>{
                        _devSelector.removeEventListener('keyup',enterPress);
                    }
                }
            }
    },[dependency,divSelector,BtnSelector])
}