import React ,{useState,useEffect} from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import CardItem from '../../components/carditem/CardItem.js';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { DataGrid,  GridToolbar } from '@mui/x-data-grid'
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Contest()
{
  const [category, setCategory] = React.useState('');

  const handleChange = (event) => {
    setCategory(event.target.value);
  };


const [button,setButton]=useState('')

  const handleMakeWinner =  async()=>
  {
    let res = await axios.post(process.env.REACT_APP_SERVER_URL + "/contest/makeWinnerContest", 
  {'content_Id':id}, {withCredentials:true});
  setButton(1)
  // setStatus('accepted');
  // setOpensnack(true);
  // fetchPosts();
  }

  const handleAccept = async () => {
    // console.log("ID ACCEPTED",id)
  
    let res = await axios.post(process.env.REACT_APP_SERVER_URL + "/contest/acceptContestPost", 
    {'content_Id':id}, {withCredentials:true});
    setStatus('accepted');
    setOpensnack(true);
    fetchPosts();
  }
  var [status,setStatus]=useState('')
  const handleReject = async () => {
    // console.log("ID ACCEPTED",{id})
  
    let res = await axios.post(process.env.REACT_APP_SERVER_URL + "/contest/rejectContestPost", {'content_Id':id}, {withCredentials:true});
    setStatus('rejected');
    setOpensnack(true);
    fetchPosts();
  }

  const[opensnack,setOpensnack]=React.useState(false);

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setOpensnack(false);
  };
  

const [ong,setOngContest]=useState([]);

  const handleClickOpenOngoing = async(e) => {
    
    console.log('contest id',e.row.id);
 
    let res = await axios.post(process.env.REACT_APP_SERVER_URL + "/contest/getEachContest",
    {'contest_Id':e.row.id},{ withCredentials: true });

    console.log('res DATA ', res.data)
    res=res.data;
    console.log(res)
    res = res.map(({ cp_id: id, ...rest }) => ({ id, ...rest }))

    console.log("REsponse in getEachContest UPCOMING", res);

    
    setOngContest(res)
console.log('Ongoing contest res ',ong)
  
setOpen(true);
    
   }; 



  const [thisContest,setthisContest]=useState([]);
  // var a= Date(Date.now().toString().slice(0,10));
  
const today= new Date().toLocaleDateString('en-GB');
  // var a= b.toISOString();
  // var b=a.toString().slice(0,10);
  
  const [content, setContent] = useState([]);
  var posts;
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
    
    setContent(res)
    
  };
  
 





  const handleSubmit = async () => {
    // console.log("ID ACCEPTED",{id}).
    var fdate = new Date(from).toISOString().slice(0,10);
    var tdate = new Date(to).toISOString().slice(0,10);
    console.log('fdate',fdate);
    console.log('tdate',tdate);
    console.log('From',from)
    console.log('to',to)
    console.log('cate',category)
  
    let res = await axios.post(process.env.REACT_APP_SERVER_URL +
       "/create/createContest", {'from':fdate, 'to':tdate , 'category':category}, { withCredentials: true });

    fetchContest();
   
  }
  const[open,setOpen]=React.useState(false);
  const[opens,setOpens]=React.useState(false);
  const[invisible,setInvisible]=useState(false);


  const handleClickOpen = async(e) => {
    
    console.log('contest id',e.row.id);
 
    let res = await axios.post(process.env.REACT_APP_SERVER_URL + "/contest/getEachContest",
    {'contest_Id':e.row.id},{ withCredentials: true });

    console.log('res DATA ', res.data)
    res=res.data;
    console.log(res)
    res = res.map(({ cp_id: id, ...rest }) => ({ id, ...rest }))

    console.log("REsponse in getEach", res);

    
    setthisContest(res)
console.log('This contest res ',thisContest)
  setInvisible(true)
setOpen(true);
    
   }; 




   const handleClickOpenUpcoming = async(e) => {
    
    console.log('contest id',e.row.id);
 
    let res = await axios.post(process.env.REACT_APP_SERVER_URL + "/contest/getEachContest",
    {'contest_Id':e.row.id},{ withCredentials: true });

    console.log('res DATA ', res.data)
    res=res.data;
    console.log(res)
    res = res.map(({ cp_id: id, ...rest }) => ({ id, ...rest }))

    console.log("REsponse in getEach", res);

    
    setthisContest(res)
console.log('This contest res ',thisContest)
  setInvisible(false)
setOpen(true);
    
   }; 





const[openCompleted,setOpenCompleted]=useState(false);

   const handleClickOpenCompleted = async(e) => {
    


    console.log('contest id',e.row.id);
 
    let res = await axios.post(process.env.REACT_APP_SERVER_URL + "/contest/getEachContest",
    {'contest_Id':e.row.id},{ withCredentials: true });

    console.log('res DATA ', res.data)
    res=res.data;
    console.log(res)
    res = res.map(({ cp_id: id, ...rest }) => ({ id, ...rest }))

    console.log("REsponse in getEach", res);

    
    setthisContest(res)
console.log('This contest res ',thisContest)
  // setInvisible(true)
setOpenCompleted(true);
    
   }; 








   const handleCloseCompleted = () => {
    setOpenCompleted(false);

  };

  const handleCloseCo=()=>
  {
    setOp(false);
  }


  const handleClose = () => {
    setOpen(false);
  };

  const handleCloses = () => {
    setOpens(false);
  };

  const [cid,setCid]=useState('');


  const handleStart = async (e,c) => {

    console.log('e',e)
    console.log('c',c)
     setCid(c.row.id);
    
    // console.log("ID ACCEPTED",{id}).
   
  
    let res = await axios.post(process.env.REACT_APP_SERVER_URL + "/contest/startContest",
     {'id':c.row.id},{ withCredentials: true });

    fetchContest();
    fetchCurrentContest();
   
  }
const [currid,setCurrid]=useState('');

  const handleStop = async (e,c) => {

    console.log('e',e)
    console.log('c',c)
     setCurrid(c.row.id);
    
  
    // console.log("ID ACCEPTED",{id}).
   
  
    let res = await axios.post(process.env.REACT_APP_SERVER_URL + "/contest/stopContest",
     {'id':c.row.id},{ withCredentials: true });
        

    fetchContest();
    fetchCurrentContest();
    fetchCompletedContest();
   
  }



  const [from, setFrom] = React.useState([null, null]);
  const [to, setTo] = React.useState([null, null]);



  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'from_date', headerName: 'From Date', width: 180 },
    { field: 'to_date', headerName: 'To Date', editable: false, width: 150 },
    { field: 'cat_Name', headerName: 'Category', editable: false, width: 150 },


    {
      field: "",
      renderCell: (cellValues) => {
        console.log('cell',typeof(cellValues.row.from_date));
        console.log('Today',typeof(today))
        if(  cellValues.row.from_date == today)
        {
        return (
          
          <Button
            variant="outlined"
            color="primary"
            onClick={(event) => {
              handleStart(event, cellValues);
            }}
          >
            Start
          </Button>
        );
          }
      }
    }




  
  ];
  const [contest, setContest] = useState([]);
  const fetchContest = async () => {
    let res = await fetch(process.env.REACT_APP_SERVER_URL + "/fetch/getAllContest", {
      // mode: 'no-cors',
        credentials: 'include',
    });
    res = await res.json();
    console.log("this is res",res);
    res = res.map(({ contest_id: id, ...rest }) => ({ id, ...rest }))

    res.forEach((value) =>{
      value.from_date=new Date(value.from_date).toLocaleDateString('en-GB'); 
      value.to_date=new Date(value.to_date).toLocaleDateString('en-GB'); 
    });
            
    console.log("REsponse", res);
    // res.forEach((item, i) => { item.id = i + 1; });
    // console.log('res', res) 
    
    setContest(res)
// console.log('contest-res',contest)
  };

  const [curContest,setCurContest]=useState([]);
  const fetchCurrentContest = async () => {
    let res = await fetch(process.env.REACT_APP_SERVER_URL + "/contest/getCurrContest", {
      // mode: 'no-cors',
        credentials: 'include',
    });
    res = await res.json();
    console.log("this is res",res);
    res = res.map(({ contest_id: id, ...rest }) => ({ id, ...rest }))

    res.forEach((value) =>{
      value.from_date=new Date(value.from_date).toLocaleDateString('en-GB'); 
      value.to_date=new Date(value.to_date).toLocaleDateString('en-GB'); 
    });
            
    console.log(" Current contest REsponse", res);
    // res.forEach((item, i) => { item.id = i + 1; });
    // console.log('res', res) 
    
    setCurContest(res)
console.log('contest-res',curContest)
  };
  const curColumns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'from_date', headerName: 'From Date', width: 180 },
    { field: 'to_date', headerName: 'To Date', editable: false, width: 150 },
    { field: 'cat_Name', headerName: 'Category', editable: false, width: 150 },
    {
      field: "",
      renderCell: (cellValues) => {
        // console.log('cell',typeof(cellValues.row.from_date));
        // console.log('Today',typeof(today))
        if(  cellValues.row.to_date == today)
        {
        return (
          
          <Button
            variant="outlined"
            color="primary"
            onClick={(event) => {
              handleStop(event, cellValues);
            }}
          >
            Stop
          </Button>
        );
          }
      }
    }

  ];

  const [compContest,setCompContest]=useState([]);
  const fetchCompletedContest = async () => {
    let res = await fetch(process.env.REACT_APP_SERVER_URL + "/contest/getCompContest", {
      // mode: 'no-cors',
        credentials: 'include',
    });
    res = await res.json();
    console.log("this is res",res);
    res = res.map(({ contest_id: id, ...rest }) => ({ id, ...rest }))

    res.forEach((value) =>{
      value.from_date=new Date(value.from_date).toLocaleDateString('en-GB'); 
      value.to_date=new Date(value.to_date).toLocaleDateString('en-GB'); 
    });
            
    console.log("REsponse", res);
    // res.forEach((item, i) => { item.id = i + 1; });
    // console.log('res', res) 
    
    setCompContest(res)
// console.log('contest-res',contest)
  };

  const compColumns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'from_date', headerName: 'From Date', width: 180 },
    { field: 'to_date', headerName: 'To Date', editable: false, width: 150 },
    { field: 'cat_Name', headerName: 'Category', editable: false, width: 150 },
  
  ];

  const thisColumns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'content_Title', headerName: 'TITLE', width: 180 },
    { field: 'user_Name', headerName: 'WRITER', editable: false, width: 150 },
    {field: 'content_Likes', headerName: 'LIKES', editable: false, width: 150 },
  
  ];

  const ongColumns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'content_Title', headerName: 'TITLE', width: 180 },
    { field: 'user_Name', headerName: 'WRITER', editable: false, width: 150 },
    {field: 'content_Likes', headerName: 'LIKES', editable: false, width: 150 },
  ];


  
//   const fetcheachContest = async () => {
//     let res = await fetch(process.env.REACT_APP_SERVER_URL + "/contest/geteachContest", {
//       // mode: 'no-cors',
//         credentials: 'include',
//     });
//     res = await res.json();
//     console.log("this is res",res);
//     res = res.map(({ contest_id: id, ...rest }) => ({ id, ...rest }))

//     res.forEach((value) =>{
//       value.from_date=new Date(value.from_date).toLocaleDateString('en-GB'); 
//       value.to_date=new Date(value.to_date).toLocaleDateString('en-GB'); 
//     });
            
//     console.log("Response", res);
//     // res.forEach((item, i) => { item.id = i + 1; });
//     // console.log('res', res) 
    
//     setthisContest(res)
// // console.log('contest-res',contest)
//   };
const [title,setTitle]=useState('');
const[desc,setDesc]=useState('')
const[image,setImage]=useState('')
const[id,setId]=useState('')
const handleViewPost = (e) => {
  console.log(e);

 
  setTitle(e.row.content_Title);
  setDesc(e.row.content);
  setId(e.row.id)
  setImage(e.row.content_Image)
 //  setImage(e.row.content_Image)
 //  setImage(imageDataURI.encode(e.row.content, 'jpg'))
console.log(title);
console.log(desc);
   
   setOpens(true);
 };

const[op,setOp]=useState(false)
 const handleViewCompletedPost = (e) => {
  console.log(e);

 
  setTitle(e.row.content_Title);
  setDesc(e.row.content);
  setId(e.row.id)
  setImage(e.row.content_Image)
 //  setImage(e.row.content_Image)
 //  setImage(imageDataURI.encode(e.row.content, 'jpg'))
console.log(title);
console.log(desc);
   
   setOp(true);
 };


useEffect(() => {
  fetchPosts();
  fetchContest();
  fetchCurrentContest();
  fetchCompletedContest();
  
  
}, []);


  return(
    <>
    <h1>CONTEST </h1>

    <div style={{ margin: '20px 119px 40px' }}>
    <h3 style={{color:"red", margin: '50px 21px 45px'}}> NEW CONTEST</h3>
    <form>
      
    <LocalizationProvider dateAdapter={AdapterDateFns}>
  <DatePicker
    label="From Date"
    value={from}
    onChange={(newValue) => {
      setFrom(newValue);
    }}
    renderInput={(params) => <TextField {...params} />}
  />
  <DatePicker
    label="To Date"
    value={to}
    onChange={(newValue) => {
      setTo(newValue);
    }}
    renderInput={(params) => <TextField {...params} />}
  />

</LocalizationProvider>

<Box  sx={{maxWidth: 150,display: 'inline', gap: 15 ,width: 150}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={1}>Technical</MenuItem>
          <MenuItem value={2}>Social</MenuItem>
          <MenuItem value={3}>Geographical</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <Button variant="outlined" onClick={handleSubmit}>Submit</Button>

      </form>
    
    </div>

    <div style={{ margin: '20px 119px 40px' }}>
    <h3 style={{color:"red", margin: '50px 21px 45px'}}> ONGOING CONTEST</h3>
    <div style={{height: 400, width: '100%', alignContent: 'center' }}>
    
      <DataGrid
        rows={curContest}
        columns={curColumns}
        pageSize={5}
        components={{Toolbar: GridToolbar }}
        onCellDoubleClick={handleClickOpen}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
    </div>
    <div>
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
           
          </Toolbar>
        </AppBar>
       
        <div style={{height: 400, margin: '108px 82px' , width: '100%', alignContent: 'center' }}>
    
    <DataGrid
      rows={thisContest}
      columns={thisColumns}
      pageSize={5}
      components={{Toolbar: GridToolbar }}
      onCellDoubleClick={handleViewPost}
      rowsPerPageOptions={[5]}
      checkboxSelection
    />
  </div>
         
      </Dialog>
      </div>
    


    <div style={{ margin: '20px 119px 40px' }}>
    <h3 style={{color:"red", margin: '50px 21px 45px'}}> UPCOMING CONTEST</h3>
    <div style={{height: 400, width: '100%', alignContent: 'center' }}>
    
      <DataGrid
        rows={contest}
        columns={columns}
        pageSize={5}
        components={{Toolbar: GridToolbar }}
        onCellDoubleClick={handleClickOpenUpcoming}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
    </div>

    <div style={{ margin: '20px 119px 40px' }}>
    <h3 style={{color:"red", margin: '50px 21px 45px'}}> COMPLETED CONTEST</h3>
    <div style={{height: 400, width: '100%', alignContent: 'center' }}>
    
      <DataGrid
        rows={compContest}
        columns={compColumns}
        pageSize={5}
        components={{Toolbar: GridToolbar }}
        onCellDoubleClick={handleClickOpenCompleted}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
    </div>

    <div>
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
           
          </Toolbar>
        </AppBar>
       
        <div style={{height: 400, margin: '108px 82px' , width: '100%', alignContent: 'center' }}>
    
    <DataGrid
      rows={thisContest}
      columns={thisColumns}
      pageSize={5}
      components={{Toolbar: GridToolbar }}
      onCellDoubleClick={handleViewPost}
      rowsPerPageOptions={[5]}
      checkboxSelection
    />
  </div>
         
      </Dialog>
      </div>
    


      <div>
    <Dialog
        
        fullScreen
        open={opens}
        onClose={handleCloses}
        TransitionComponent={Transition}
      >
        
          <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloses}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            {/* <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography> */}
            
            { invisible ? null : <Button autoFocus disabled={button == 1} color="inherit" onClick={handleAccept}>
              Accept
            </Button>
}
{invisible ? null :
             <Button autoFocus color="inherit" onClick={handleReject}>
              Reject
            </Button> 
            }
            
          </Toolbar>
        </AppBar>
        <h1 style={{margin: '74px 29px 18px'}}>{title}</h1>
        <img src={image} style={{width:'80%', height:'50%', margin:'1px 106px'}}></img>
       <p style={{margin: '53px 113px', display:'block'}}>{desc}</p>
       <Snackbar open={opensnack} autoHideDuration={1500} onClose={handleCloseSnack}>
         {alert?  <Alert onClose={handleCloseSnack} severity="info">You have {status} the post!</Alert>: <></> }
         </Snackbar>
         
      </Dialog>
      </div>
    







//completed contest




<div>
    <Dialog
        
        fullScreen
        open={openCompleted}
        onClose={handleCloseCompleted}
        TransitionComponent={Transition}
      >
        
          <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseCompleted}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            {/* <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography> */}
           
          </Toolbar>
        </AppBar>
       
        <div style={{height: 400, margin: '108px 82px' , width: '100%', alignContent: 'center' }}>
    
    <DataGrid
      rows={thisContest}
      columns={thisColumns}
      pageSize={5}
      components={{Toolbar: GridToolbar }}
      onCellDoubleClick={handleViewCompletedPost}
      rowsPerPageOptions={[5]}
      checkboxSelection
    />
  </div>
         
      </Dialog>
      </div>






      <div>
    <Dialog
        
        fullScreen
        open={op}
        onClose={handleCloseCo}
        TransitionComponent={Transition}
      >
        
          <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseCo}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            
            
            { <Button autoFocus disabled={button == 1} color="inherit" onClick={handleMakeWinner}>
              Make Winner
            </Button> }

             {/* { <Button autoFocus color="inherit" onClick={handleReject}>
              Reject
            </Button> 
}
             */}
            
          </Toolbar>
        </AppBar>
        <h1 style={{margin: '74px 29px 18px'}}>{title}</h1>
        <img src={image} style={{width:'80%', height:'50%', margin:'1px 106px'}}></img>
       <p style={{margin: '53px 113px', display:'block'}}>{desc}</p>
       <Snackbar open={opensnack} autoHideDuration={1500} onClose={handleCloseSnack}>
         {alert?  <Alert onClose={handleCloseSnack} severity="info">You have {status} the post!</Alert>: <></> }
         </Snackbar>
         
      </Dialog>
      </div>
     




      </>
  )

}