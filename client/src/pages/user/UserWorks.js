import React , {useState,useEffect} from 'react';
import { DataGrid,  GridToolbar } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import axios from 'axios';

// import imageDataURI from 'image-data-uri';


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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserWorks() {

const[id,setId]=useState('');

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (e) => {
   console.log(e);

  
   setTitle(e.row.content_Title);
   setDesc(e.row.content);
   setId(e.row.id)
   setImage(e.row.content_Image)
  //  setImage(e.row.content_Image)
  //  setImage(imageDataURI.encode(e.row.content, 'jpg'))
console.log(title);
console.log(desc);
    
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };




  
  const [content, setContent] = useState([]);
  const fetchPosts = async () => {
    let res = await fetch(process.env.REACT_APP_SERVER_URL + "/fetchPost/getUserPosts", {
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


// const handleAccept = async () => {
//   // console.log("ID ACCEPTED",id)

//   let res = await axios.post(process.env.REACT_APP_SERVER_URL + "/post/acceptPost", {
//       method: "POST",
//       headers: { Accept: 'application/json', "Content-Type": "application/json", },
//       credentials: 'include',
//       body:{'content_Id':id}
//   });
//   fetchPosts();
// }

// const handleReject = async () => {
//   // console.log("ID ACCEPTED",{id})

//   let res = await axios.post(process.env.REACT_APP_SERVER_URL + "/post/rejectPost", {
//       method: "POST",
//       headers: { Accept: 'application/json', "Content-Type": "application/json", },
//       credentials: 'include',
//       body:{'content_Id':id}
//   });
//   fetchPosts();
// }

const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'content_Title', headerName: 'Title', width: 180 },
  { field: 'content', headerName: 'Content', editable: true, width: 150 },
  { field: 'content_Status', headerName: 'Status', editable: true, width: 150 }
  // {
  //   field: "",
  //   renderCell: (cellValues) => {
  //     return (
  //       <Button
  //         variant="contained"
  //         color="primary"
  //         onClick={handleClickOpen}
  //       >
  //         View
  //       </Button>
  //     );
  //   }
  // }
  
];



const [title,setTitle]=useState('');
const[desc,setDesc]=useState('')
const[image,setImage]=useState('')
  return <PostWrapper>
    
    <div style={{height: 400, width: '100%', alignContent: 'center' }}>
    
      <DataGrid
        rows={content}
        columns={columns}
        pageSize={5}
        // components={{Toolbar: GridToolbar }}
        onCellDoubleClick={handleClickOpen}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>

    
    <div>
      
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button> */}
      <Dialog
        
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
       
      
               <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            {/* <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography> */}
            {/* <Button autoFocus color="inherit" onClick={handleAccept}>
              Accept
            </Button>
            <Button autoFocus color="inherit" onClick={handleReject}>
              Reject
            </Button> */}
          </Toolbar>
        </AppBar>
        <h1>{title}</h1>
        <img src={image} style={{width:'80%', height:'50%', margin:'1px 106px'}}></img>
       <p style={{margin: '53px 113px', display:'block'}}>{desc}</p>
       
        {/* <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItem>
        </List> */}
      </Dialog>
    </div>

    </PostWrapper>
}

