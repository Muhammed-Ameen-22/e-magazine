import React , {useState,useEffect} from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';


import styled from 'styled-components';
import { useHistory } from "react-router-dom"; 

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
    // console.log('res', res) 
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
      />
    </div>
    </UserWrapper>
}

