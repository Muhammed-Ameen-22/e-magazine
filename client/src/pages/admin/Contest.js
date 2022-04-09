import React ,{useState,useEffect} from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
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
import { DataGrid,  GridToolbar } from '@mui/x-data-grid'

export default function Contest()
{
  const [category, setCategory] = React.useState('');

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  // var a= Date(Date.now().toString().slice(0,10));
  
const today= new Date().toLocaleDateString('en-GB');
  // var a= b.toISOString();
  // var b=a.toString().slice(0,10);
  

  const handleSubmit = async () => {
    // console.log("ID ACCEPTED",{id}).
    var fdate = new Date(from).toISOString().slice(0,10);
    var tdate = new Date(to).toISOString().slice(0,10);
    console.log('fdate',fdate);
    console.log('tdate',tdate);
    console.log('From',from)
    console.log('to',to)
    console.log('cate',category)
  
    let res = await axios.post(process.env.REACT_APP_SERVER_URL + "/create/createContest", {
        method: "POST",
        headers: { Accept: 'application/json', "Content-Type": "application/json", },
        credentials: 'include',
        body:{'from':fdate, 'to':tdate , 'category':category}
        
    });

    fetchContest();
   
  }

  const [cid,setCid]=useState('');


  const handleStart = async (e,c) => {

    console.log('e',e)
    console.log('c',c)
     setCid(c.row.id);
    
    // console.log("ID ACCEPTED",{id}).
   
  
    let res = await axios.post(process.env.REACT_APP_SERVER_URL + "/contest/startContest", {
        method: "POST",
        headers: { Accept: 'application/json', "Content-Type": "application/json", },
        credentials: 'include',
        body:{'id':c.row.id}
        
    });

    fetchContest();
    fetchCurrentContest();
   
  }
const [currid,setCurrid]=useState('');

  const handleStop = async (e,c) => {

    console.log('e',e)
    console.log('c',c)
     setCurrid(c.row.id);
    
    // console.log("ID ACCEPTED",{id}).
   
  
    let res = await axios.post(process.env.REACT_APP_SERVER_URL + "/contest/stopContest", {
        method: "POST",
        headers: { Accept: 'application/json', "Content-Type": "application/json", },
        credentials: 'include',
        body:{'id':c.row.id}
        
    });

    fetchContest();
    fetchCurrentContest();
    fetchCompletedContest();
   
  }



  const [from, setFrom] = React.useState([null, null]);
  const [to, setTo] = React.useState([null, null]);



  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'from_date', headerName: 'From Date', width: 180 },
    { field: 'to_date', headerName: 'To Date', editable: true, width: 150 },
    { field: 'cat_Name', headerName: 'Category', editable: true, width: 150 },


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
            
    console.log("REsponse", res);
    // res.forEach((item, i) => { item.id = i + 1; });
    // console.log('res', res) 
    
    setCurContest(res)
// console.log('contest-res',contest)
  };
  const curColumns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'from_date', headerName: 'From Date', width: 180 },
    { field: 'to_date', headerName: 'To Date', editable: true, width: 150 },
    { field: 'cat_Name', headerName: 'Category', editable: true, width: 150 },
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
    { field: 'to_date', headerName: 'To Date', editable: true, width: 150 },
    { field: 'cat_Name', headerName: 'Category', editable: true, width: 150 },
  
  ];





useEffect(() => {
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
        // onCellDoubleClick={handleClickOpen}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
    </div>
    


    <div style={{ margin: '20px 119px 40px' }}>
    <h3 style={{color:"red", margin: '50px 21px 45px'}}> UPCOMING CONTEST</h3>
    <div style={{height: 400, width: '100%', alignContent: 'center' }}>
    
      <DataGrid
        rows={contest}
        columns={columns}
        pageSize={5}
        components={{Toolbar: GridToolbar }}
        // onCellDoubleClick={handleClickOpen}
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
        // onCellDoubleClick={handleClickOpen}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
    </div>
    
      </>
  )
}