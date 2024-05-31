import {responseCodes} from '../config/dbStatusCode.js';
const sanitizeResponse=(_result)=>{
    if(Array.isArray(_result[0])){
      return _result[0];
    }else{
      return _result;
    }
  }
  const removeNullfromObject=()=>{
    
  }
const getNewObj=(_obj)=>{
  const newObj={};
  _obj.forEach(_v => {
    newObj[_v?.COLUMN_NAME]=_v?.COLUMN_NAME==='Pid'?'-1':'';
  });
  return [newObj]
}
const com_message=(id)=>{
  return responseCodes.find((_v)=>Number(_v.id)===Number(id));
}
function formatDate(isoDateString) {
  return isoDateString.split('T')[0];
}
  export 
  {
    sanitizeResponse,
    getNewObj,
    com_message,
    formatDate
  }