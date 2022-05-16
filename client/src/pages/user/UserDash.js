import React, { useState, useEffect } from 'react';
import '../user/contentcards.css';
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
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import Grid from "@material-ui/core/Grid";
import Fade from 'react-reveal/Fade';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



export default function UserDash() {
 
const[opens,setOpens]=React.useState(false);
  const [open, setOpen] = React.useState(false);
const[image,setImage]=useState('')
const[title,setTitle]=useState('')
const[desc,setDesc]=useState('')
var[likes,setLikes]=useState('')
var [postId, setId] = useState('');
const[cat,setCat]=useState('');
const [post,setPost]=useState('');




const[date,setDate]=useState(0)

const handleChangeDate=(e)=>
{
  setDate(e.target.value)
}

const [category, setCategory] = useState('');

const [cd,setCD]=useState('');
const [name,setName]=useState('')


  const handleClickOpen = async(id) => {

setId(id);

    let res = await axios.post(process.env.REACT_APP_SERVER_URL + "/eachPost/getEachPosts", 
    {'content_Id':id},{ withCredentials: true });
    console.log('getEachPosts in user',res);
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
    let res = await axios.post(process.env.REACT_APP_SERVER_URL + '/like/likePost', 
    { content_Id: postId }, { withCredentials: true });
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

// const handleSearch = async () => {
//   let res = await fetch(process.env.REACT_APP_SERVER_URL + "/fetchPost/getApprovedPosts", {
    
//     credentials: 'include',
//   });
//   res = await res.json();
 
//   console.log("this is res in fetchPosts", res);
//   res = res.map(({ content_Id: id, ...rest }) => ({ id, ...rest }));


//   posts = res;

//   console.log('posts in fetchPosts', posts)
  

//   setContent(res)

// };


  var posts;
  const [content, setContent] = useState([]);
  const fetchPosts = async () => {
    console.log('Category',catg)
    console.log('Sub',sub)

    const val = {
      catg,
      sub,
      date
    };

    let res = await axios.post(process.env.REACT_APP_SERVER_URL + "/fetchPost/getApprovedPostsUser", val,
    {withCredentials: true });
    // res = await res.json();
    // (result) => {
    //   setIsLoaded(true);
    //   setItems(result);
    console.log("this is res in fetchPosts", res.data);
    res = res.data;
    console.log("this is res in fetchPosts", res);
    res = res.map(({ content_Id: id, ...rest }) => ({ id, ...rest }));


    posts = res;

    console.log('posts in fetchPosts', posts)
    

    setContent(res)

  };
  
  useEffect(() => {
    fetchPosts();

  }, []);


  var printId=(id)=>{
    console.log("This is id ",id)
  }

// const[post,setPost]=useState([])
//   const handleClick=
//   async (id) => {
//     console.log('Handle Clicked',id)
    
//     let res = await axios.post(process.env.REACT_APP_SERVER_URL + "/eachPost/getEachPosts",
//     {'content_Id':id},{ withCredentials: true });
    
//     console.log('Handle Clicked',id)
    
//     // res = await res.json();

    
//     console.log("this is res",res.data);

//     // res = res.map(({ content_Id: id, ...rest }) => ({ id, ...rest }));
//     // res.forEach((item, i) => { item.id = i + 1; });
//     // console.log('res', res) 
    
//     setPost(res.data)
//     console.log('EachPost',post)

// };

const handleClickSnack = () => {
  setOpens(true);
};

const handleCloseSnack = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpens(false);
};


const [sub,setSub]=useState(0)
const [catg, setCatg] = useState(0);

  const handleChange = (event) => {
    setCatg(event.target.value);
  };



  const handleChangeSub = (event) => {
    setSub(event.target.value);
  };

  const  renderCard = (card, index) => {
    // console.log("POSTS",content[0].cat_Name);
    console.log("Category", category)
   
 





    return (

<>
{/* <Grid container spacing={3}> */}
      <div className='cards' onClick={() => {handleClickOpen(card.id)}}>
        
        <CardItem cols ={3}
      
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
              {likes} <IconButton onClick={() => {handleLike(card.id)}}><ThumbUpOutlinedIcon /></IconButton>
              {/* <Button  autoFocus color="inherit" onClick={() => {handleLike(card.id)}}> */}
              {/* Like
            </Button> */}
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
        <h5 style={{margin: '0px 630px 30px'}}>({name} , {cd})</h5>
        <img src={image} style={{width:'80%', height:'50%', margin:'1px 106px'}}></img>
        
       <p style={{margin: '53px 113px', display:'block',fontSize: 15,lineHeight:'2'}}>
         {desc}</p>
         <Snackbar open={opens} autoHideDuration={1500} onClose={handleCloseSnack}>
         {alert?  <Alert onClose={handleCloseSnack} severity="info">You have already liked the post!</Alert>: <></> }
         </Snackbar>
       </Dialog>
    </div>
{/* </Grid> */}
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


//   const [posts, setposts] = useState([]);

//   const [selectedCategory, setSelectedCategory] = useState();
  
//   function getFilteredList() {
//     if (!selectedCategory) {
//       return posts;
//     }
//     return posts.filter((item) => item.category === selectedCategory);
//   }


//   var filteredList = useMemo(getFilteredList, [selectedCategory, posts]);


  return <>
  {/* <div style={{ margin: '40px 200px 5px ' ,width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <Box  sx={{maxWidth: 150,display: 'inline', gap: 15 ,width: 120}}>
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
  </Box>
  </div> */}
  <div style={{width:'300px' ,margin:'76px 500px 2px',display:'flex'}}>
  <Box sx={{ maxWidth: 150, display: 'inline', gap: 55, width: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={catg}
                label="Category"
                onChange={handleChange}
              >
                 <MenuItem value={0} selected>All</MenuItem>
                <MenuItem value={1}>Technical</MenuItem>
                <MenuItem value={2}>Social</MenuItem>
                <MenuItem value={3}>Geographical</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ maxWidth: 150, display: 'inline', gap: 55, width: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select">Type</InputLabel>
              <Select
                labelId="demo-simple-select"
                id="demo-simple"
                value={sub}
                label="SubCategory"
                onChange={handleChangeSub}
              >
                <MenuItem value={0} selected>All</MenuItem>
                <MenuItem value={1}>Story</MenuItem>
                <MenuItem value={2}>Poem</MenuItem>
                <MenuItem value={3}>Article</MenuItem>
                <MenuItem value={4}>Essay</MenuItem>
                <MenuItem value={5}>Experience</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ maxWidth: 150, display: 'inline', gap: 55, width: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select">Month</InputLabel>
              <Select
                labelId="demo-simple-select"
                id="demo-simple"
                value={date}
                label="Month"
                onChange={handleChangeDate}
              >
                <MenuItem value={0}selected>All</MenuItem>
                <MenuItem value={1}>January</MenuItem>
                <MenuItem value={2}>February</MenuItem>
                <MenuItem value={3}>March</MenuItem>
                <MenuItem value={4}>April</MenuItem>
                <MenuItem value={5}>May</MenuItem>
                <MenuItem value={6}>June</MenuItem>
                <MenuItem value={7}>July</MenuItem>
                <MenuItem value={8}>August</MenuItem>
                <MenuItem value={9}>September</MenuItem>
                <MenuItem value={10}>October</MenuItem>
                <MenuItem value={11}>November</MenuItem>
                <MenuItem value={12}>December</MenuItem>
              </Select>
            </FormControl>
          </Box>
          { <Button autoFocus color="inherit" onClick={fetchPosts}>
              Search
            </Button> }

  </div>
  <Fade right>
  {/* <div className="grid" 
  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> */}
 <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 8, sm: 8, md: 12 }}>
     {content.map(renderCard)}
     </Grid>
     </Fade>
    {/* {filteredList.content.map(renderCard)} */}
    {/* </div>; */}
    
    </>



};
  
// };


