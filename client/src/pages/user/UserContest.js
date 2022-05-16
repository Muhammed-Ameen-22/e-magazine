import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { useHistory } from "react-router-dom";
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
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
import Button from '@mui/material/Button';
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import CardItem from '../../components/carditem/CardItem.js';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import UserDash from './UserDash'
import "../write/write.css";
import Fade from 'react-reveal/Fade';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserContest() {

  let history = useHistory();

  const [category, setCategory] = React.useState('');

  const [thisContest, setthisContest] = useState([])

  const handleClickOpenContest = async (e) => {

    console.log('contest id', e.row.id);

    let res = await axios.post(process.env.REACT_APP_SERVER_URL + "/contest/getEachContest",
      { 'contest_Id': e.row.id }, { withCredentials: true });

    console.log('res DATA ', res.data[0])
    // res = await res.json();
    // console.log("this is res",res);
    res = res.data[0];
    console.log(res)
    res = [res].map(({ cp_id: id, ...rest }) => ({ id, ...rest }))

    console.log("REsponse in getEach", res);

    setthisContest(res)
    console.log('This contest res ', thisContest)
    setOpen(true);

  };

  const [sub,setSubCategory]=useState()

  const handleChangeSub = (event) => {
    setSubCategory(event.target.value);
  };



  // const handleSubmits = async () => {
  //   // console.log("ID ACCEPTED",{id}).
  //   var fdate = new Date(from).toISOString().slice(0,10);
  //   var tdate = new Date(to).toISOString().slice(0,10);
  //   console.log('fdate',fdate);
  //   console.log('tdate',tdate);
  //   console.log('From',from)
  //   console.log('to',to)
  //   console.log('cate',category)

  //   let res = await axios.post(process.env.REACT_APP_SERVER_URL + "/create/createContest", {
  //       method: "POST",
  //       headers: { Accept: 'application/json', "Content-Type": "application/json", },
  //       credentials: 'include',
  //       body:{'from':fdate, 'to':tdate , 'category':category}

  //   });

  // }

  const [from, setFrom] = React.useState([null, null]);
  const [to, setTo] = React.useState([null, null]);
  const [open, setOpen] = React.useState(false);
  const [cat, setCat] = useState('');
  const [conId, setConId] = useState('');

  const handleClick = (e, c) => {
    console.log('e', e);
    console.log('c', c);
    console.log('category', c.row.cat_Name)
    setConId(c.row.id)
    setCat(c.row.cat_Name);
    console.log('category', cat)
    setOpen(true);
  }

  useEffect(() => {
    console.log(cat)

  }, [cat], [conId])

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'from_date', headerName: 'From Date', width: 180 },
    { field: 'to_date', headerName: 'To Date', editable: true, width: 150 },
    { field: 'cat_Name', headerName: 'Category', editable: true, width: 150 },
    {
      field: "",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="outlined"
            color="primary"
            onClick={(event) => {
              handleClick(event, cellValues);
            }}
          >
            Join
          </Button>
        );
      }
    }

  ];



  const [error, setError] = useState(false);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState("");
  //   const { user } = useContext(Context);


  const reader = new FileReader();
  const imgSubmit = (e) => {
    console.log(e.target.files[0])
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (e) => {
      // console.log('Zero', reader.result)
      console.log('first', e.target.result)
      // const a = e.target.result
      // console.log('second', a)
      // setFile(a)
      // setFile(reader.result)

      setFile(e.target.result)
      console.log('Third', file)
      // setDrivingLicenceDataURL(reader.result);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(res.cookie);
    const newPost = {
      file,
      //username: user.username,
      title,
      desc,
      sub,
      conId

    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        //const res = await axios.post(process.env.REACT_APP_SERVER_URL+"/createPost", data);

      } catch (err) { }
    }
    try {
      const res = await axios.post(process.env.REACT_APP_SERVER_URL + "/contest/createContestPost",
        newPost, { withCredentials: true });
      console.log("status", res);
      if (res.status == "200") {

        // return(
        //   <Stack sx={{ width: '100%' }} spacing={2}>
        // <Alert severity="info">Successfully submitted. Wait for admin approval !</Alert>
        // </Stack>
        // );
        window.alert('Wait for admin approval');

        window.location.replace("/UserContest");
      }
      else {
        window.alert("ERROR! Something went wrong. Please try again");
      }
      //window.location.replace("/post/" + res.data._id);
    } catch (err) { }
  };

  //   const [category, setCategory] = React.useState('');


const [compContest,setCompContest]=useState([])

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
    {
      field: "",
      renderCell: (cellValues) => {
        // console.log('cell',typeof(cellValues.row.from_date));
        // console.log('Today',typeof(today))
        if (true) {
          return (

            <Button
              variant="outlined"
              color="primary"
              onClick={(event) => {
                console.log('cellValue in contest', cellValues.row.id)
                history.push({
                  pathname: '/UserCompContestView',
                  // search: '?query=abc',
                  state: { detail: cellValues.row.id }
                });

              }}
            >
              View
            </Button>
          );
        }
      }
    }
  
  ];

  const [curContest, setCurContest] = useState([]);
  const fetchCurrentContest = async () => {
    let res = await fetch(process.env.REACT_APP_SERVER_URL + "/contest/getCurrContest", {
      // mode: 'no-cors',
      credentials: 'include',
    });
    res = await res.json();
    console.log("this is current res", res);
    res = res.map(({ contest_id: id, ...rest }) => ({ id, ...rest }))

    res.forEach((value) => {
      value.from_date = new Date(value.from_date).toLocaleDateString('en-GB');
      value.to_date = new Date(value.to_date).toLocaleDateString('en-GB');
    });

    console.log(" Current contest REsponse", res);
    // res.forEach((item, i) => { item.id = i + 1; });
    // console.log('res', res) 

    setCurContest(res)
    console.log('contest-res', curContest)
  };

  const today = new Date().toLocaleDateString('en-GB');



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
        if (true) {
          return (

            <Button
              variant="outlined"
              color="primary"
              onClick={(event) => {
                console.log(cellValues.row.id)
                history.push({
                  pathname: '/UserContestView',
                  // search: '?query=abc',
                  state: { detail: cellValues.row.id }
                });

              }}
            >
              View
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
    console.log("this is res", res);
    res = res.map(({ contest_id: id, ...rest }) => ({ id, ...rest }))

    res.forEach((value) => {
      value.from_date = new Date(value.from_date).toLocaleDateString('en-GB');
      value.to_date = new Date(value.to_date).toLocaleDateString('en-GB');
    });

    console.log("REsponse", res);
    // res.forEach((item, i) => { item.id = i + 1; });
    // console.log('res', res) 

    setContest(res)

  };

  useEffect(() => {
    fetchContest();
    fetchCurrentContest();
    fetchCompletedContest();
  }, []);

  // const renderCard = (card, index) => {
    return (
      <>
      <Fade up>
        <h1>CONTEST</h1>

        <div style={{ margin: '20px 119px 40px' }}>
          <h3 style={{ color: "red", margin: '50px 21px 45px' }}> ONGOING CONTEST</h3>
          <div style={{ height: 400, width: '100%', alignContent: 'center' }}>

            <DataGrid
              rows={curContest}
              columns={curColumns}
              pageSize={5}
              onCellDoubleClick={handleClickOpenContest}
              rowsPerPageOptions={[5]}

            />
          </div>
        </div>


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

          {/* <div className='cards' > */}
          {/* onClick={() => { handleClickOpen(card.id) }} */}
            {/* <CardItem cols={3}

              src={card.content_Image}
              id={card.id}
              text={card.content_Title}
              label={card.cat_Name}

            />
          </div> */}
<UserDash/>



        </Dialog>




        <div style={{ margin: '20px 119px 40px' }}>
          <h3 style={{ color: "red", margin: '50px 21px 45px' }}> UPCOMING CONTEST</h3>
          <div style={{ height: 400, width: '100%', alignContent: 'center' }}>

            <DataGrid
              rows={contest}
              columns={columns}
              pageSize={5}
              // components={{Toolbar: GridToolbar }}
              // onCellDoubleClick={handleClickOpen}
              rowsPerPageOptions={[5]}
            // checkboxSelection
            />
          </div>
        </div>



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
              <Button autoFocus color="inherit" onClick={handleSubmit} >
                Submit
              </Button>

            </Toolbar>
          </AppBar>
          {/* <h1>{title}</h1>
        <img src={image} style={{width:'80%', height:'50%', margin:'1px 106px'}}></img>
       <p style={{margin: '53px 113px', display:'block'}}>{desc}</p> */}

        
          <div className="write" style={{margin:'21px 1px 1px'}}>



            {file && (
              <img className="writeImg" src={file} alt="" />
            )}
            <form className="writeForm" onSubmit={handleSubmit}>
              <div className="writeFormGroup">
                <label htmlFor="fileInput">
                  <i className="writeIcon fas fa-plus"></i>
                </label>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={imgSubmit}
                />
                <input
                  type="text"
                  placeholder="Title"
                  className="writeInput"
                  autoFocus={true}
                  onChange={e => setTitle(e.target.value)}
                />
                <Box sx={{ maxWidth: 150, display: 'inline', gap: 15, width: 120 }}>
                  <FormControl fullWidth>
                    {/* <InputLabel id="demo-simple-select-label">Category</InputLabel> */}
                    {/* <h1>{cat}</h1> */}
                    <TextField
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={cat}
                      label="Category"
                    //   onChange={handleChange}
                    >
                      {/* <MenuItem>{cat}</MenuItem> */}

                    </TextField>
                  </FormControl>
                </Box>

                <Box sx={{ maxWidth: 150, display: 'inline', gap: 15, width: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select">Type</InputLabel>
              <Select
                labelId="demo-simple-select"
                id="demo-simple"
                value={sub}
                label="SubCategory"
                onChange={handleChangeSub}
              >
                <MenuItem value={1}>Story</MenuItem>
                <MenuItem value={2}>Poem</MenuItem>
                <MenuItem value={3}>Article</MenuItem>
                <MenuItem value={4}>Essay</MenuItem>
                <MenuItem value={5}>Experience</MenuItem>
              </Select>
            </FormControl>
          </Box>


              </div>
              <div className="writeFormGroup">
                <textarea
                  placeholder="Tell your story..."
                  type="text"
                  className="writeInput writeText"
                  onChange={e => setDesc(e.target.value)}
                ></textarea>
              </div>
              <button style={{margin: '376px 1px 1px'}} className="writeSubmit" type="submit">
                Publish
              </button>
            </form>
          </div>

          {/* <Snackbar open={opens} autoHideDuration={6000} onClose={handleCloseSnack}>
         {alert?  <Alert onClose={handleCloseSnack} severity="info">You have {status} the post!</Alert>: <></> }
         </Snackbar> */}
        </Dialog>




        <div style={{ margin: '20px 119px 40px' }}>
          <h3 style={{ color: "red", margin: '50px 21px 45px' }}> COMPLETED CONTEST</h3>
          <div style={{ height: 400, width: '100%', alignContent: 'center' }}>

            <DataGrid
              rows={compContest}
              columns={compColumns}
              pageSize={5}
              // components={{Toolbar: GridToolbar }}
              // onCellDoubleClick={handleClickOpen}
              rowsPerPageOptions={[5]}
            // checkboxSelection
            />
          </div>
        </div>

        </Fade>

      </>
    )
  }

