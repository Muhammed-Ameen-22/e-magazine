import React , {useState,useEffect} from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import * as Components from "../login/log_comp";
import styled from 'styled-components';
import { useHistory } from "react-router-dom"; 


import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'; 
import Button from '@mui/material/Button';
import axios from 'axios';





const UserWrapper = styled.div`
    width: 55%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin-bottom: 100px;
    margin-top : 100px;
    margin-left:400px;
    overflow: auto;
scrollbar-width: none;

`;

export default function Users() {


  const [checked, setChecked] = useState(true);

  const handleChange = () => {
    
    // setStatus(!status)
    // console.log(status)
    setChecked(!checked);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = (e) => {
    
    console.log('e',e.row.user_Status)
    setStatus(e.row.user_Status)
 
    console.log('Status',status)
    if(status=='Active')
    {
      setChecked(true)
    }
    else
    {
    setChecked(false)
    }
    setOpen(true);
  };
  var[status,setStatus]=useState('');
  const handleSubmit=async()=>{
    setOpen(false);
    let res = await axios.post(process.env.REACT_APP_SERVER_URL + "/status/changeStatus", {
      // mode: 'no-cors',
        credentials: 'include',
        body:{user_Status:status}
    });
  }
  const handleClose = () => {
    setOpen(false);
  };

  const [user, setUser] = useState([]);
  const history = useHistory();


  const fetchUsers = async () => {
    let res = await fetch(process.env.REACT_APP_SERVER_URL + "/fetch/getAllUsers", {
      // mode: 'no-cors',
        credentials: 'include',
    });
    res = await res.json();
    // console.log("this is res",res);
    res = res.map(({ user_ID: id, ...rest }) => ({ id, ...rest }));

    

    // res.forEach((item, i) => { item.id = i + 1; });
    console.log('res', res) 
    
    setUser(res)
    
};

useEffect(() => {
  fetchUsers();
}, []);

const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'user_Email', headerName: 'User Email', width: 180 },
  { field: 'user_Name', headerName: 'User Name', editable: true, width: 150 },
  { field: 'user_CD', headerName: 'User Course/Department', editable: true, width: 150 },
  { field: 'user_Status', headerName: 'Status', editable : true, width: 150 }
 
];




  return <UserWrapper>



    <div style={{height: 400, width: '100%', alignContent: 'center' }}>
    
      <DataGrid
        rows={user}
        columns={columns}
        pageSize={5}
        components={{Toolbar: GridToolbar }}
        
        rowsPerPageOptions={[5]}
        checkboxSelection
        onCellDoubleClick={handleClickOpen}
      />
      
</div>

<div>

      <Dialog open={open} onClose={handleClose}>
        <div>
      {checked? <p> Active</p>:<></>}
      {!checked? <p>Inactive </p>:<></>}
      <Components.CheckBoxWrapper>
                <Components.CheckBox id="checkbox" type="checkbox" checked={checked} onChange={handleChange} />
                <Components.CheckBoxLabel htmlFor="checkbox" />
              </Components.CheckBoxWrapper>
              </div>
        
        {/* <DialogTitle>Reason</DialogTitle> */}
        {!checked?  <DialogContent>
          <DialogContentText>
           Reason for making user inactive
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        : <></>}

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
    </UserWrapper>
}

