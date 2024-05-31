import React, { useEffect, useState } from 'react';
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import "jquery-ui-dist/jquery-ui";
import '../dataTable/grid.css'
import ActionBar from '../../layout/actionbar/ActionBar';
import { useNavigate } from 'react-router-dom';
import { root } from '../../../services/root/root';
export default function Grid({id,isReset,redirectTo,data,actions,activity,tableName}) {
  const Navigate=useNavigate()
  const [ids,setIds]=useState([]);
  const [Refresh, setRefresh] = useState(true);
 
  useEffect(() => {
        if(Refresh){
          root.grid.resetGrid(id);
          setIds([]);
          root.grid.init(id,data?.data,data?.columns,Navigate,redirectTo,setIds);
          setRefresh(false);
          
        }
      return ()=>setRefresh(false);
  }, [Refresh,data?.data]);
  return (
    <>        
        <ActionBar GridId={id} ids={ids} setIds={setIds} setRefresh={setRefresh} type='Grid' actionsButton={actions} activity={activity} tableName={tableName}/>
        <div className='tile-body table-responsive '>
              <table className='table dataTable stripe' id={id}> </table>
        </div>
     </>

  )
}
