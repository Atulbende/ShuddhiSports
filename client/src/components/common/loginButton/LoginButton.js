export default function LoginButton({title,classes,loader=false,clickActions=()=>{}}) {
    const actionFunction=()=>{
        clickActions()
    }
  return (
    <button type='button' className={loader?`${classes} expanded`:`${classes}`} onClick={()=>{actionFunction()}}>{loader ? <span class="traditional"></span>:title}</button>
  )
}
