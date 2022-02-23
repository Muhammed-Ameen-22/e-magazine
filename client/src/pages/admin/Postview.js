import React , {useState,useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';

import styled from 'styled-components';


const PostWrapper = styled.div`
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

export default function Postview() {

  const [content, setContent] = useState([]);
  const fetchPosts = async () => {
    let res = await fetch(process.env.REACT_APP_SERVER_URL + "/fetchPost/getAllPosts", {
      // mode: 'no-cors',
        credentials: 'include',
    });
    res = await res.json();
    // console.log("this is res",res);
    res = res.map(({ content_Id: id, ...rest }) => ({ id, ...rest }));

    

    // res.forEach((item, i) => { item.id = i + 1; });
    // console.log('res', res) 
    setContent(res)
};

useEffect(() => {
  fetchPosts();
}, []);

const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'content_Title', headerName: 'Title', width: 180 },
  { field: 'content', headerName: 'Content', editable: true, width: 150 },
  { field: 'content_Status', headerName: 'Status', editable: true, width: 150 },
  
];




  return <PostWrapper>
    <div style={{height: 400, width: '100%', alignContent: 'center' }}>
    
      <DataGrid
        rows={content}
        columns={columns}
        pageSize={5}
        
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
    </PostWrapper>
}

