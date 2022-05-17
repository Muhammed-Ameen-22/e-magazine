import React , {useState,useEffect} from 'react';
import { DataGrid,  GridToolbar ,GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  gridVisibleSortedRowIdsSelector,
  useGridApiContext} from '@mui/x-data-grid';
  import jsPDF from "jspdf";
  import PrintIcon from '@mui/icons-material/Print';
  import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
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
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import Fade from 'react-reveal/Fade';
import "../admin/admin-login/login.css";
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


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function Postview() {


  const exportPdf = (PrintData, Heading, FileName) => {
    const doc = new jsPDF()
    doc.autoTable({
        margin: { top: 72 },
        didDrawPage: (data) => {
            var currentPageNo = doc.internal.getCurrentPageInfo().pageNumber;
            var str = 'Page ' + currentPageNo;
            data.settings.margin.top = 10;
            if (currentPageNo === 1) {
     
                doc.setFontSize(15);
                doc.text(Heading, 20, 40);
                doc.setFontSize(12);
                doc.text(`List of Posts Created`, 20, 46);
                doc.text(`Generated At : ${new Date()}`, 20, 52);
                // doc.text(`From : ${fdate}}`, 20, 52);
            }
            doc.setFontSize(10);
            var pageSize = doc.internal.pageSize;
            var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
            doc.text(str, data.settings.margin.left, pageHeight - 10);
        },
        ...PrintData
    });
    doc.save(`${FileName}.pdf`)
  }
  
  const getFilteredRows = ({ apiRef }: GridCsvGetRowsToExportParams) => gridVisibleSortedRowIdsSelector(apiRef);
  
  const CustomToolbar = (props) => {
    const apiRef = useGridApiContext();
  
    const CSVToJSON = csv => {
        const lines = csv.split('\n');
        // Removing '\r'
        for (var i = 0; i < lines.length; i++) { lines[i] = lines[i].replace('\r', ''); }
        const keys = lines[0].split(',');
        return lines.slice(1).map(line => {
            return line.split(',').reduce((acc, cur, i) => {
                const toAdd = {};
                toAdd[keys[i]] = cur;
                return { ...acc, ...toAdd };
            }, {});
        });
    };
  
    const handleExport = (options: GridCsvExportOptions) => {
        if (options.type === 'pdf') {
          console.log("PDF");
            
              console.log("USER");
                exportPdf({
                    body: CSVToJSON(apiRef.current.getDataAsCsv(options)),
                    columns: [
                        { header: 'Sl No', dataKey: 'ID' },
                        { header: 'Title', dataKey: 'Title' },                            
                        { header: 'Content Creator', dataKey: 'Content Creator' },
                        { header: 'Category', dataKey: 'Category' },
                        { header: 'Sub Category', dataKey: 'Sub Category' },
                        { header: 'Submitted Date', dataKey: 'Submitted Date' },
                        { header: `Status`, dataKey: `Status` },
                    ]
                }, 'E-MAGAZINE', 'E-Magazine:Posts');
            
        } else if (options.type === 'csv') {
            apiRef.current.exportDataAsCsv(options);
        }
    } 
  
    return (
      <GridToolbarContainer>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
          <Button
              color={'primary'}
              startIcon={<PrintIcon />}
              onClick={() => handleExport({ getRowsToExport: getFilteredRows, type: 'pdf' })}
          >
              Export pdf
          </Button>
          <Button
              color={'primary'}
              startIcon={<FileDownloadOutlinedIcon />}
              onClick={() => handleExport({ getRowsToExport: getFilteredRows, type: 'csv' })}
          >
              Export CSV
          </Button>
      </GridToolbarContainer>
  );
};


  const[opens,setOpens]=React.useState(false);

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setOpens(false);
  };
const[id,setId]=useState('');

  const [open, setOpen] = React.useState(false);

  const [cd,setCD]=useState('');
const [name,setName]=useState('')

var[likes,setLikes]=useState('')

const[cat,setCat]=useState('');
const [post,setPost]=useState('');
const [from, setFrom] = React.useState([null, null]);
const [to, setTo] = React.useState([null, null]);

  const handleClickOpen = async(e) => {
   console.log('e',e);

  
  //  setTitle(e.row.content_Title);
  //  setDesc(e.row.content);
   setId(e.row.id)
   console.log('id',id)
  //  setImage(e.row.content_Image)
  //  setImage(e.row.content_Image)
  //  setImage(imageDataURI.encode(e.row.content, 'jpg'))
// console.log(title);
// console.log(desc);
let res = await axios.post(process.env.REACT_APP_SERVER_URL + "/eachPost/getEachPosts", 
    {'content_Id':e.row.id},{ withCredentials: true });
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
    
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



const[change,setChange]=useState(false)
  const [content, setContent] = useState([]);

  const mainfetchPosts = async () => {
  
    setFrom('01/01/2022')
    setTo(new Date().toISOString().slice(0,10))
    let res = await axios.post(process.env.REACT_APP_SERVER_URL + "/fetchPost/getmainAllPosts", 
     { withCredentials: true });
  
    console.log('res before  map',res)
    res = res.data;
    console.log("this is res before map",res);

    res = res.map(({ content_Id: id, ...rest }) => ({ id, ...rest }));

    
    res.forEach((value) =>{
      value.content_Date=new Date(value.content_Date).toLocaleDateString('en-GB'); 
 
    });
            
    // res.forEach((item, i) => { item.id = i + 1; });
    console.log('res', res) 
    setContent(res)
  
};

  const fetchPosts = async () => {

  
    

    var fdate = new Date(from).toISOString().slice(0,10);
    var tdate = new Date(to).toISOString().slice(0,10);
  
    let res = await axios.post(process.env.REACT_APP_SERVER_URL + "/fetchPost/getAllPosts", 
      { 'from': fdate , 'to':tdate}, { withCredentials: true });
  
    console.log('res before  map',res)
    res = res.data;
    console.log("this is res before map",res);

    res = res.map(({ content_Id: id, ...rest }) => ({ id, ...rest }));

    
    res.forEach((value) =>{
      value.content_Date=new Date(value.content_Date).toLocaleDateString('en-GB'); 
 
    });
            
    // res.forEach((item, i) => { item.id = i + 1; });
    console.log('res', res) 
    setContent(res)
  
};

useEffect(() => {
  mainfetchPosts();
  // fetchPosts();
}, []);


const handleAccept = async () => {
  // console.log("ID ACCEPTED",id)

  let res = await axios.post(process.env.REACT_APP_SERVER_URL + "/post/acceptPost", {'content_Id':id}, {withCredentials:true});
  setStatus('accepted');
  setOpens(true);
  fetchPosts();
}
var [status,setStatus]=useState('')
const handleReject = async () => {
  // console.log("ID ACCEPTED",{id})

  let res = await axios.post(process.env.REACT_APP_SERVER_URL + "/post/rejectPost", {'content_Id':id}, {withCredentials:true});
  setStatus('rejected');
  setOpens(true);
  fetchPosts();
}

const columns = [
  { field: 'id', headerName: 'ID', editable: true,width: 50 },
  { field: 'content_Title', headerName: 'Title',editable: true, width: 180 },
  { field: 'user_Name', headerName: 'Writer', editable: true, width: 150 },
  { field: 'cat_Name', headerName: 'Category', editable: true, width: 150 },
  { field: 'subcat', headerName: 'Sub Category', editable: true, width: 150 },
  { field: 'content_Date', headerName: 'Submitted Date', editable: true, width: 150 },
  { field: 'content_Status', headerName: 'Status', editable: true, width: 150 },

  
  
];



const [title,setTitle]=useState('');
const[desc,setDesc]=useState('')
const[image,setImage]=useState('')
  return <PostWrapper>
    
   
    <Fade left>
    <div style={{margin: '16px 0px 25px',width: '100%', alignContent: 'center' }}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
  <DatePicker
    label="From Date"
    value={from}
    onChange={(newValue) => {
      setFrom(newValue);
      setChange(true)
      
    }}
    renderInput={(params) => <TextField {...params} />}
  />
  <DatePicker
    label="To Date"
    value={to}
    onChange={(newValue) => {
      setChange(true)
      setTo(newValue);
    }}
    renderInput={(params) => <TextField {...params} />}
  />

{<Button class='btn-3' onClick={fetchPosts}>SEARCH</Button>}
</LocalizationProvider>
</div>
<div style={{height: 400, width: 1050, alignContent: 'center' }}>
      <DataGrid 
        rows={content} 
        columns={columns}
        pageSize={5}
        components={{ Toolbar: CustomToolbar }}
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
            <Button autoFocus color="inherit" onClick={handleAccept}>
              Accept
            </Button>
            <Button autoFocus color="inherit" onClick={handleReject}>
              Reject
            </Button>
          </Toolbar>
        </AppBar>
        <h1>{title}</h1>
        <h5 style={{margin: '0px 630px 30px'}}>({name} , {cd})</h5>
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
         <Snackbar open={opens} autoHideDuration={1500} onClose={handleCloseSnack}>
         {alert?  <Alert onClose={handleCloseSnack} severity="info">You have {status} the post!</Alert>: <></> }
         </Snackbar>
      </Dialog>
    </div>
</Fade>
    </PostWrapper>
}

