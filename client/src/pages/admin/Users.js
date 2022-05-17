import React , {useState,useEffect} from 'react';
import {  DataGrid, GridToolbar,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  gridVisibleSortedRowIdsSelector,
  useGridApiContext } from '@mui/x-data-grid';
  import PrintIcon from '@mui/icons-material/Print';
  import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
  
import * as Components from "../login/log_comp";
import styled from 'styled-components';
import { useHistory } from "react-router-dom"; 
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'; 
import Button from '@mui/material/Button';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Fade from 'react-reveal/Fade';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { DockTwoTone } from '@mui/icons-material';

import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

const UserWrapper = styled.div`
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

export default function Users() {


  const [checked, setChecked] = useState(true);

  const handleChange = () => {
    
    // setStatus(!status)
    // console.log(status)
    setChecked(!checked);
  };
const [id,setId]=useState('');
  const [open, setOpen] = useState(false);
  var [status,setStatus]=useState('')
  const handleClickOpen = (e,c) => {
    console.log('e in open',e);
    console.log('c in open',c);


    // console.log('e',e.row.user_Status)
    setStatus(c.row.user_Status)
    console.log('Status',status)
    // console.log(e.row.id)
    setId(c.row.id)
    console.log('This is id ', id)
   
    if(c.row.user_Status==='Active')
    {
      setChecked(true)
    }
    else
    {
    setChecked(false)
    }
    setOpen(true);
  };
  
  const[statuss,setStatuss]=useState('');
  const handleSubmit=async()=>{
    // console.log("Handlesubmit")
    // console.log("CHECKED",checked)
    setOpen(false);
    console.log('CHECKED',checked)
    if( checked === true ) 
    {
    setStatuss('Active')
    var stat='Active'
    }
    else  
    {
      setStatuss('Inactive')
      var stat='Inactive'
   }
    console.log('STATUS', statuss);
    console.log('REason',reason)
    let res = await axios.post(process.env.REACT_APP_SERVER_URL + "/status/changeStatus",
    {user_Status:stat, user_remark:reason, user_Id:id}, {withCredentials:true}); 
    fetchUsers();
  }
  const handleClose = () => {
    setOpen(false);
  };

  const [user, setUser] = useState([]);
  const history = useHistory();

const [reason,setReason]=useState('HI');
  const fetchUsers = async () => {
    let res = await fetch(process.env.REACT_APP_SERVER_URL + "/fetch/getAllUsers", {
      // mode: 'no-cors',
        credentials: 'include',
    });
    res = await res.json();
    // console.log("this is res",res);
    res = res.map(({ user_ID: id, ...rest }) => ({ id, ...rest }));

    

    // res.forEach((item, i) => { item.id = i + 1; });
    console.log('res', res) 
    
    setUser(res)
    console.log('user',user)
    
};

var username;
const[openPost,setopenPost]=useState(false);
const handleClosePost=()=>{
  setopenPost(false)
}

const [userName,setUserName]=useState('')
const handleClickOpenUser = async(e)=>
{
  console.log('id open user',e)
  let res= await axios.post(process.env.REACT_APP_SERVER_URL + "/fetchPost/getEachUserPosts", 
  {'id':e.row.id}, {withCredentials:true});

  console.log('res DATA ', res)
    res=res.data;
    console.log(res)
    res = res.map(({ content_Id: id, ...rest }) => ({ id, ...rest }))

    console.log("REsponse in getEachContest UPCOMING", res);

    setUserPost(res)
    setOpenUser(true);
     setUserName(e.row.user_Name);
    console.log('username',userName)
//     setOngContest(res)
// console.log('Ongoing contest res ',ong)
  
// setOpen(true);

}
const [openUser,setOpenUser]=useState(false)
const handleCloseUser=()=>{
  setOpenUser(false)
}

const [userPost,setUserPost]=useState([])


useEffect(() => {
  fetchUsers();
}, []);

const [title,setTitle]=useState('');
const[desc,setDesc]=useState('')
const[image,setImage]=useState('')
const [likes,setLikes]=useState('')
const [cd,setCD]= useState('')
const [cat,setCat]=useState('')
const [name,setName]=useState('')
const[post,setPost]=useState([])
const handleViewPost = async(e) => {
  console.log('e',e);

 
 //  setTitle(e.row.content_Title);
 //  setDesc(e.row.content);
  setId(e.row.id)
  console.log('id',id)

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
   
   setopenPost(true);
 };


const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'user_Email', headerName: 'Email', width: 180 },
  { field: 'user_Name', headerName: 'Full Name', editable: false, width: 180 },
  { field: 'user_CD', headerName: 'Course/Department', editable: false, width: 220 },
  { field: 'count(c.content)', headerName: 'Content Count', editable: false, width: 150 },
  { field: 'user_Status', headerName: 'Status', editable : false, width: 100 },
  {
    field: "",
    renderCell: (cellValues) => {
      return (
        <IconButton
  onClick={(event)=>{handleClickOpen(event, cellValues)}}
>
  <EditIcon/>
  </IconButton>
      );
    }
  }
 
];

const UserColumn=[
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'content_Title', headerName: 'Title', width: 250 },
  { field: 'cat_Name', headerName: 'Category', editable: true, width: 150 },
  { field: 'subcat', headerName: 'Subcategory', editable: true, width: 150 },
  { field: 'content_Status', headerName: 'Status', editable: true, width: 150 }
]



console.log('user before render',user)

const exportPdf = (PrintData, Heading, FileName) => {
  const doc = new jsPDF()
  doc.autoTable({
      margin: { top: 82 },
      didDrawPage: (data) => {
          var currentPageNo = doc.internal.getCurrentPageInfo().pageNumber;
          var str = 'Page ' + currentPageNo;
          data.settings.margin.top = 10;
          if (currentPageNo === 1) {
   
              doc.setFontSize(15);
              doc.text(Heading, 20, 40);
              doc.setFontSize(12);
              // doc.text(`Generated By: ${user.username} (Teacher)`, 20, 46);
              doc.text(`Generated At : ${new Date()}`, 20, 52);
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
          if (props.tableType === 'user') {
            console.log("USER");
              exportPdf({
                  body: CSVToJSON(apiRef.current.getDataAsCsv(options)),
                  columns: [
                      { header: 'Sl No', dataKey: 'ID' },
                      { header: 'User Email', dataKey: 'Email' },                            
                      { header: 'Full Name', dataKey: 'Full Name' },
                      { header: 'Course/Department', dataKey: 'Course/Department' },
                      { header: 'Content Count', dataKey: 'Content Count' },
                      { header: `Status`, dataKey: `Status` },
                  ]
              }, 'List of Users', 'E-Magazine:Content Creators');
          } else if (props.tableType === 'user') {
              exportPdf({
                  body: CSVToJSON(apiRef.current.getDataAsCsv(options)),
                  columns: [
                      { header: 'Sl No', dataKey: 'Sl No' },
                      { header: 'Date', dataKey: 'Date' },
                      { header: 'Timing', dataKey: 'Timing' },
                      { header: 'ETA / Completed', dataKey: 'ETA / Completed' },
                      { header: 'Venue Name', dataKey: 'Venue Name' },
                      { header: 'Teacher Name', dataKey: 'Teacher Name' },
                      { header: `Reliever ID`, dataKey: `Reliever ID` },
                  ]
              }, 'Reliever Duty Allocation History', 'Reliever Allocation');

          }
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

  return <UserWrapper>

<Fade left>

    <div style={{height: 450, width: '100%', alignContent: 'center' }}>
    
    
    
      <DataGrid
        rows={user}
        columns={columns}
        pageSize={5}
        components={{ Toolbar: CustomToolbar }}
        onCellDoubleClick={handleClickOpenUser}
        rowsPerPageOptions={[5]}
        checkboxSelection
        componentsProps={{ toolbar: { tableType: 'user' } }}
       
      />
      
</div>

<div>

      <Dialog open={open} onClose={handleClose}>
        <div style={{marginLeft:'22px'}}>
      {checked? <p> Active</p>:<></>}
      {!checked? <p>Inactive </p>:<></>}
      <Components.CheckBoxWrapper>
                <Components.CheckBox id="checkbox" type="checkbox" checked={checked} onChange={handleChange} />
                <Components.CheckBoxLabel htmlFor="checkbox" />
              </Components.CheckBoxWrapper>
              </div>
        
        {/* <DialogTitle>Reason</DialogTitle> */}
        {!checked?  <DialogContent>
          <DialogContentText>
           Reason for making user inactive
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            onChange={(e)=>setReason(e.target.value)}
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        : <></>}

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>





    <div>
    <Dialog
        
        fullScreen
        open={openUser}
        onClose={handleCloseUser}
        TransitionComponent={Transition}
      >
        
          <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseUser}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            {/* <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography> */}
           
          </Toolbar>
        </AppBar>
       <h3 style={{margin:'15px 550px -21px'}}>Contents posted by {userName}</h3>
        <div style={{height: 450, width: '50%', alignContent: 'center' ,margin:'50px 385px 159px'}}>
    
    <DataGrid
      rows={userPost}
      columns={UserColumn}
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
        open={openPost}
        onClose={handleClosePost}
        TransitionComponent={Transition}
      >
       
      
               <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClosePost}
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
         
      </Dialog>
    </div>

    </Fade>
    </UserWrapper>
}

