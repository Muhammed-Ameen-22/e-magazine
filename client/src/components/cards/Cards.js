import React, { useState, useEffect } from 'react';
import './cards.css';
import { useHistory ,generatePath,useParams} from "react-router-dom"; 
import CardItem from '../carditem/CardItem';
import axios from 'axios';
import PostView from '../../pages/user/PostView';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Slide from '@mui/material/Slide';
import { DataGrid } from '@mui/x-data-grid';
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
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



export default function Cards() {
 
const[opens,setOpens]=React.useState(false);
  const [open, setOpen] = React.useState(false);
const[image,setImage]=useState('')
const[title,setTitle]=useState('')
const[desc,setDesc]=useState('')
var[likes,setLikes]=useState('')
var [postId, setId] = useState('');
const[cat,setCat]=useState('');
const [post,setPost]=useState('');



// const [error, setError] = useState(null);
// const [isLoaded, setIsLoaded] = useState(false);
// const [items, setItems] = useState([]);
// const [q, setQ] = useState("");
// const [searchParam] = useState(["capital", "name", "numericCode"]);
// const [filterParam, setFilterParam] = useState(["All"]); 





const [category, setCategory] = useState('');
// const handleChange = async(event) =>{

//   console.log('Value',event.target.value);
//   setCategory(event.target.value);
//   console.log('HandleChange',category)

// let res = await axios.post(process.env.REACT_APP_SERVER_URL + "/filterPost/getFilterPosts", {
//   headers: { Accept: 'application/json', "Content-Type": "application/json", },
//   credentials: 'include',
//   body:{'category':event.target.value}
// })
//  console.log('RES',res);
//   {content.map(renderCard)}

// };

  const handleClickOpen = async(id) => {

setId(id);

    let res = await axios.post(process.env.REACT_APP_SERVER_URL + "/eachPost/getEachPosts",
     {'content_Id':id},{withCredentials:true});
    
    setDesc(res.data[0].content)
    setImage(res.data[0].content_Image)
    // setTitle(res.data[0].content_Category)
setTitle(res.data[0].content_Title)
setLikes(res.data[0].content_Likes)
setCat(res.data[0].cat_Name);
    setPost(res.data)
    
    
   


    console.log('res in eachPost',res.data)
    console.log('EachPost',posts)
    // post.map(function(cValue,idx){
    //   console.log("currentValue.id:",cValue.content_Title);
    // })

    // console.log('Data', post.data[0].content)
  setOpen(true);
  console.log('Dialog id', id)
};

const [alert, setAlert] = useState(false);
const handleClose = () => {
  setOpen(false);
};

  const handleLike=async()=>{
    console.log('Post id',postId)
    // console.log('Like id',id)
    let res = await axios.post(process.env.REACT_APP_SERVER_URL + "/like/likePost", {
      // mode: 'no-cors',
      credentials: 'include',
      body:{'content_Id':postId}
    });
    console.log('Res',res)
    if(res.data=='Already Liked')
    {
      // console.log('user',user);
      // var datetime = new Date();
      // console.log("Date",datetime)
      setAlert(true);
      setOpens(true)
      
      // window.alert('Already liked')
      // <Alert severity="info">This is an info alert — check it out!</Alert>
      
    }
    if(res.data=='Liked')
    {
    setLikes(likes+1)
    }
  }



  var posts;
  const [content, setContent] = useState([]);
  const fetchPosts = async () => {
    let res = await fetch(process.env.REACT_APP_SERVER_URL + "/fetchPost/getApprovedPosts", {
      // mode: 'no-cors',
      withCredntials: true,
      credentials: 'include',
    });
    res = await res.json();
    // (result) => {
    //   setIsLoaded(true);
    //   setItems(result);
    console.log("this is res in fetchPosts", res);
    res = res.map(({ content_Id: id, ...rest }) => ({ id, ...rest }));


    posts = res;

    console.log('posts in fetchPosts', posts)
    
    
    setContent(res)
    // console.log(res)
    // console.log('content',posts.cat_Name)
  };
  
  useEffect(() => {
    fetchPosts();

  }, []);


  var printId=(id)=>{
    console.log("This is id ",id)
  }

// const[post,setPost]=useState([])
  const handleClick=
  async (id) => {
    console.log('Handle Clicked',id)
    
    let res = await axios.post(process.env.REACT_APP_SERVER_URL + "/eachPost/getEachPosts", {
      headers: { Accept: 'application/json', "Content-Type": "application/json", },
      credentials: 'include',
      body:{'content_Id':id}
    });
    
    console.log('Handle Clicked',id)
    
    // res = await res.json();

    
    console.log("this is res",res.data);

    // res = res.map(({ content_Id: id, ...rest }) => ({ id, ...rest }));
    // res.forEach((item, i) => { item.id = i + 1; });
    // console.log('res', res) 
    
    setPost(res.data)
    console.log('EachPost',post)

};

const handleClickSnack = () => {
  setOpens(true);
};

const handleCloseSnack = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpens(false);
};



  const renderCard = (card, index) => {
    // console.log("POSTS",content[0].cat_Name);
    console.log("Category", category)
   
    // let dataBuffer = new Buffer(card.content_Image);
    // let mediaType = 'PNG';
    // console.log('category',category);
    // console.log('category',cat);
    return (

<>


      <div className='cards' onClick={() => {handleClickOpen(card.id)}}>

        <CardItem
      
          src={card.content_Image}
          id={card.id}
            text={card.content_Title}
          label={card.cat_Name}
          path='/UserDash'
          
         
        />
      {/* <ThumbDownIcon/>
      <ThumbUpIcon/> */}
      
     </div>


<div >
      
  
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
            <Typography sx={{ ml: 170, marginTop:1 }} variant="h6" component="div">
              {likes} <ThumbUpIcon />
              <Button  autoFocus color="inherit" onClick={() => {handleLike(card.id)}}>
              Like
            </Button>
            </Typography>
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
        
       <p style={{margin: '53px 113px', display:'block',fontSize: 15,lineHeight:'2'}}>
         {desc}</p>
         <Snackbar open={opens} autoHideDuration={1500} onClose={handleCloseSnack}>
         {alert?  <Alert onClose={handleCloseSnack} severity="info">You have already liked the post!</Alert>: <></> }
         </Snackbar>
       </Dialog>
    </div>

    </>
      


    );
          

  };




  return <>
  {/* <div style={{ margin: '40px 200px 5px ' ,width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> */}
  {/* <Box  sx={{maxWidth: 150,display: 'inline', gap: 15 ,width: 120}}>
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Category</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={category}
        label="Age"
        onChange={(e)=>setCategory(e.target.value)}
      >
        <MenuItem value={1}>Technical</MenuItem>
        <MenuItem value={2}>Social</MenuItem>
        <MenuItem value={3}>Geographical</MenuItem>
      </Select>
    </FormControl>
  </Box> */}
  {/* </div> */}
  <div className="grid" 
  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
     {content.map(renderCard)}
    {/* {filteredList.content.map(renderCard)} */}
    </div>;
    </>

};
  



