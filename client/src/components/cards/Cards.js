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


  const handleClickOpen = async(id) => {

setId(id);

    let res = await axios.post(process.env.REACT_APP_SERVER_URL + "/eachPost/getEachPosts", {
      headers: { Accept: 'application/json', "Content-Type": "application/json", },
      credentials: 'include',
      body:{'content_Id':id}
    })
    setDesc(res.data[0].content)
    setImage(res.data[0].content_Image)
    // setTitle(res.data[0].content_Category)
setTitle(res.data[0].content_Title)
setLikes(res.data[0].content_Likes)
    setPost(res.data)
    
    
   


    console.log('res in eachPost',res.data)
    console.log('EachPost',post)
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
      credentials: 'include',
    });
    res = await res.json();
    console.log("this is res in fetchPosts", res);
    res = res.map(({ content_Id: id, ...rest }) => ({ id, ...rest }));


    posts = res;

    console.log('posts in fetchPosts', posts)
    
    //     for(var i=0;i<6;i++)
    //     {
    //  getTitle(posts[i].content)
    //     }

    // res.forEach((item, i) => { item.id = i + 1; });
    // console.log('res', res) 
    
    setContent(res)
    console.log(content)
  };
  
  useEffect(() => {
    fetchPosts();

  }, []);


  var printId=(id)=>{
    console.log("This is id ",id)
  }

const[post,setPost]=useState([])
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


    // let dataBuffer = new Buffer(card.content_Image);
    // let mediaType = 'PNG';

    return (

<>


      <div className='cards' onClick={() => {handleClickOpen(card.id)}}>

        <CardItem
      
          src={card.content_Image}
          id={card.id}
            text={card.content_Title}
          label=''
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
         <Snackbar open={opens} autoHideDuration={6000} onClose={handleCloseSnack}>
         {alert?  <Alert onClose={handleCloseSnack} severity="info">You have already liked the post!</Alert>: <></> }
         </Snackbar>
       </Dialog>
    </div>

    </>
      


    );

  };


  // <Card style={{ width: "18rem" }} key={index} className="box">
  //   {/* <Card.Img variant="top" src="holder.js/100px180" src={card.image} /> */}
  //   <Card.Body>
  //     <Card.Title>{card.content_Title}</Card.Title>
  //     <Card.Text>{card.content}</Card.Text>
  //   </Card.Body>
  // </Card>


  return <div className="grid" 
  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    {content.map(renderCard)}</div>;



  // var[title,getTitle]=useState([])

  // for(var i=0;i<10;i++)
  // {
  //   getTitle(posts[i].content);
  //   console.log('title',title)
  // }



  // return (
  //   <div className="grid">{posts.map(renderCard)}</div>);

  //   <div className='cards'>
  //     <h1>Check out these new posts!</h1>
  //     <div className='cards__container'>
  //       <div className='cards__wrapper'>
  //         <ul className='cards__items'>
  //           <CardItem
  //             src='images/img-9.jpg'
  //             text={title}
  //             label='Adventure'

  //             path='/services'
  //           />
  //           <CardItem
  //             src='images/img-2.jpg'
  //             text={title}
  //             label='Luxury'
  //             path='/services'
  //           />
  //         </ul>
  //         <ul className='cards__items'>
  //           <CardItem
  //             src='images/img-3.jpg'
  //             text={title}
  //             label='Mystery'
  //             path='/services'
  //           />
  //           <CardItem
  //             src='images/img-4.jpg'
  //             text='Experience Football on Top of the Himilayan Mountains'
  //             label='Adventure'
  //             path='/products'
  //           />
  //           <CardItem
  //             src='images/img-8.jpg'
  //             text='Ride through the Sahara Desert on a guided camel tour'
  //             label='Adrenaline'
  //             path='/sign-up'
  //           />
  //         </ul>
  //       </div>
  //     </div>
  //   </div>

  // );

};


