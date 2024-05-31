const _async=(RequestFuntion)=>{
   return (res,req,next)=>{
     Promise.resolve(RequestFuntion(res,req,next)).catch((err)=> next(err));
    }
}
export {_async}