import React,{useMemo} from 'react'
import '../checkbox/checkbox.css'
function Checkbox({id,list=[],value=[],onChangeEvent,col='col-15'}) {
  const handleCheckboxChange=(item)=>{
    let _selected=(typeof value==='string' && value==="")?[]:typeof value==='string'?JSON.parse([value]):value;
    if(_selected.includes(item)){
       _selected=_selected?.filter((i)=>i!=item);
    }else{
      _selected=[..._selected,item]
    }
  onChangeEvent((pre)=>({...pre,[id]:_selected}))
  }
 const SelectedItems=useMemo(()=>{
      return value
 },[value])
  return (
<>
    {list.map((item)=>{
      const isChecked=SelectedItems.includes(item.id);
            return (<div key={item.id} className={`checkbox-wrapper-15 mx-2 ` + col}>
            <input  type="checkbox"  className="inp-cbx" checked={isChecked} id={item.id} onChange={()=>handleCheckboxChange(item.id)} />
            <label className="cbx"  htmlFor={item.id}>
            <span>
                <svg width="12px" height="9px" viewbox="0 0 12 9">
                    <polyline points="1 5 4 8 11 1"></polyline>
                </svg>
            </span>
            <span>{item.label}</span>
            </label>
      </div>)
    })}
   </>
  )
}

export default Checkbox