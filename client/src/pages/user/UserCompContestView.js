import React, { useState, useEffect } from 'react';
import '../../components/cards/cards.css';
import { useHistory ,generatePath,useParams} from "react-router-dom"; 
import CardItem from '../../components/carditem/CardItem.js';
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

import { useLocation } from "react-router-dom";



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



export default function UserCompContestView() {
    const location = useLocation();
const[opens,setOpens]=React.useState(false);
  const [open, setOpen] = React.useState(false);
const[image,setImage]=useState('')
const[title,setTitle]=useState('')
const[desc,setDesc]=useState('')
var[likes,setLikes]=useState('')
var [postId, setId] = useState('');
const[cat,setCat]=useState('');
const [post,setPost]=useState('');
const[conid,setConId]=useState('')

// useEffect(() => {
//     console.log(location.pathname); // result: '/secondpage'
//     // console.log(location.search); // result: '?query=abc'
//     console.log(location.state.detail); // result: 'some_value'
//     setConId(location.state.detail)
//     // console.log('id',conid)
//  }, [location,conid]);


console.log('path',location.pathname);
console.log('loc.state',location.state.detail)
// const [error, setError] = useState(null);
// const [isLoaded, setIsLoaded] = useState(false);
// const [items, setItems] = useState([]);
// const [q, setQ] = useState("");
// const [searchParam] = useState(["capital", "name", "numericCode"]);
// const [filterParam, setFilterParam] = useState(["All"]); 




const [cd,setCD]=useState('');
const [name,setName]=useState('')
const [category, setCategory] = useState('');


  const handleClickOpen = async(id) => {
    console.log('id',id);
setId(id);

    let res = await axios.post(process.env.REACT_APP_SERVER_URL + "/contest/getEachCompContestPosts", 
    {'content_Id':id},{ withCredentials: true });
console.log('res',res)
setOpen(true);
    setDesc(res.data[0].content)
    setImage(res.data[0].content_Image)
    // setTitle(res.data[0].content_Category)
    setTitle(res.data[0].content_Title)
    setLikes(res.data[0].content_Likes)
    setCat(res.data[0].cat_Name);
    setCD(res.data[0].user_CD);
    setName(res.data[0].user_Name);
    setPost(res.data)
    
    console.log('res in eachPost',res.data)
    console.log('EachPost',posts)
    // post.map(function(cValue,idx){
    //   console.log("currentValue.id:",cValue.content_Title);
    // })

    // console.log('Data', post.data[0].content)
  
  console.log('Dialog id', id)
};

const [alert, setAlert] = useState(false);
const handleClose = () => {
  setOpen(false);
};

//   const handleLike=async()=>{
//     console.log('Post id',postId)
//     // console.log('Like id',id)
//     let res = await axios.post(process.env.REACT_APP_SERVER_URL + '/contest/likePost', 
//     { content_Id: postId }, { withCredentials: true });
//     console.log('Res',res)
//     if(res.data=='Already Liked')
//     {
//       // console.log('user',user);
//       // var datetime = new Date();
//       // console.log("Date",datetime)
//       setAlert(true);
//       setOpens(true)
      
//       // window.alert('Already liked')
//       // <Alert severity="info">This is an info alert — check it out!</Alert>
      
//     }
//     if(res.data=='Liked')
//     {
//     setLikes(likes+1)
//     }
//   }



  var posts;
  const [content, setContent] = useState([]);
const[winner,setWinner]=useState([])
  const fetchWinnerPost = async () => {
    
    let res = await axios.post(process.env.REACT_APP_SERVER_URL + "/contest/getWinnerContestPost", 
    {'contest_Id':location.state.detail},{ withCredentials: true });

    res = res.data;
    // (result) => {
    //   setIsLoaded(true);
    //   setItems(result);
    console.log("this is res in fetchPosts", res);
    res = res.map(({ cp_id: id, ...rest }) => ({ id, ...rest }));


    posts = res;

    console.log('posts in fetchPosts', posts)
    
  
    
    setWinner(res)
    
  };

  const fetchPosts = async () => {
    
    let res = await axios.post(process.env.REACT_APP_SERVER_URL + "/contest/getApprovedContestPosts", 
    {'contest_Id':location.state.detail},{ withCredentials: true });

    res = res.data;
    // (result) => {
    //   setIsLoaded(true);
    //   setItems(result);
    console.log("this is res in fetchPosts", res);
    res = res.map(({ cp_id: id, ...rest }) => ({ id, ...rest }));


    posts = res;

    console.log('posts in fetchPosts', posts)
    
  
    
    setContent(res)
    
  };
  
  useEffect(() => {
    fetchPosts();
    fetchWinnerPost();

  }, []);


  var printId=(id)=>{
    console.log("This is id ",id)
  }

// const[post,setPost]=useState([])
  const handleClick=
  async (id) => {
    console.log('Handle Clicked',id)
    
    let res = await axios.post(process.env.REACT_APP_SERVER_URL + "/eachPost/getEachPosts",
    {'content_Id':id},{ withCredentials: true });
    
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
   
    console.log('conid',conid);
    return (

<>


      <div className='cards' onClick={() => {handleClickOpen(card.id)}}>

        <CardItem
      
          src={card.content_Image}
          id={card.id}
            text={card.content_Title}
          label={card.cat_Name}
          // path='/UserContestView'
          
         
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
               {/* <Button  autoFocus color="inherit" onClick={() => {handleLike(card.id)}}>
               Like
             </Button> */}
            </Typography>
      
          </Toolbar>
        </AppBar>

        <h1>{title}</h1>
        <h5 style={{margin: '0px 630px 30px'}}>({name} , {cd})</h5>
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



  const renderCardWinner = (card, index) => {
    // console.log("POSTS",content[0].cat_Name);
    console.log("Category", category)
   
    console.log('conid',conid);
    return (

<>


      <div className='cards' onClick={() => {handleClickOpen(card.id)}}>

        <CardItem
      
          src={card.content_Image}
          id={card.id}
            text={card.content_Title}
          label={card.cat_Name}
          // path='/UserContestView'
          
         
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
               {/* <Button  autoFocus color="inherit" onClick={() => {handleLike(card.id)}}>
               Like
             </Button> */}
            </Typography>
      
          </Toolbar>
        </AppBar>

        <h1>{title}</h1>
        <h5 style={{margin: '0px 630px 30px'}}>({name} , {cd})</h5>
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
  <h1 style={{ color: "#1c1b1b", margin: '50px 21px 5px' }}>WINNER</h1>
  <div className="grid" 
  style={{ margin: '1px 400px 1px' ,width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      {/* <h1 style={{ color: "#1c1b1b", margin: '50px 21px 5px' }}>WINNER</h1> */}
      {winner.map(renderCardWinner)}
      </div>;
      <h1 style={{ color: "#1c1b1b", margin: '50px 21px 5px' }}>REMAINING POSTS</h1>
      <div className="grid" 
  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
     
     {content.map(renderCard)}
    {/* {filteredList.content.map(renderCard)} */}
    </div>
    </>
};



