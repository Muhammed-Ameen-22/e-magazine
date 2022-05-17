import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import * as Components from "./log_comp.js";
import "./login.css";
import { useHistory } from "react-router-dom"; 
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function PassReset() {

  axios.defaults.withCredentials = true;

const handleValOTP = () => {
   toggle(false)
}

  let history = useHistory();
  const [signIn, toggle] = React.useState(true);

  const [checked, setChecked] = React.useState(false);
const [emailForgot,setEmailForgot]=useState('')
  const handleChange = () => {
    setChecked(!checked);
  };

  const [name, setName] = useState("");
  const [cd, setCd] = useState("BCA");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage,setErrorMessage]=useState("")


const[confirm,setConfirmPassword]=useState('')

  const [loginStatus, setLoginStatus] = useState("");
const [alert,setAlert]=useState(false)
const[openA,setOpenA]=useState(false)






  const handlePass=()=>
  {
setAlert(true)
setOpen(false);
setOpenA(true);
console.log('Forgot Email',emailForgot)
  } 

  const handleAlertClose=()=>
  {
    setAlert(false)
  }





  const[otp,setOTP]=useState('')

  const verifyOTP=async()=>
  {
    
    console.log('reached verify otp')
    const resetKey=localStorage.getItem('resetKey')
    let res = await axios.post(process.env.REACT_APP_SERVER_URL + "/otp/ValidateOTP", 
    {'key':resetKey,'otp':otp,'email':localStorage.getItem('email')},
    { withCredentials: true }).then((response) => {
      
    console.log('after verify otp',response.data)
    console.log('res Data in verify OTP',response.data)
    // console.log('res Data in verify OTP',res.data[0])

    if(response.data.Status === 'Success')
    {
      console.log('res.data.Status',response.data.Status)
      toggle(false)
    }
    else if(response.data.Status === 'Failure')
    {
      console.log('Failure')
      setStatus(response.data.Reason)
    }
  })
  };
const [status,setStatus]=useState('')
  

const changePassword=async()=>{
  console.log('Pass',password.length)
  console.log('Confirm',confirm)

  if(password.length <5 )
  {
    setConfirmation('Password must be greater than 5 characters')
  }
  else
  {
  if(password != confirm)
  {
    setConfirmation('Password do not match')
  }
else if(password === confirm){
  setConfirmation('')
  const res = await axios.post(process.env.REACT_APP_SERVER_URL+"/changePassword", {
    email: localStorage.getItem('email'),
    password: password
  })
  console.log('Changed password')
  setOpenDialog(true)
}
  }

}

const[openDialog,setOpenDialog]=useState(false)


  const[conf,setConfirmation]=useState('')
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      console.log("HI");
      const res = await axios.post(process.env.REACT_APP_SERVER_URL+"/createUser", {
        name,
        cd,
        email,
        password
        
      }).then((response) => {
        if (response.data.message) {
          setLoginStatus(response.data.message);
          console.log('response',response.data.message)
        }
        
        else
        {
      console.log("RES in signup"+res);
      res.data && window.location.replace("/login");
        }
    })
  }
     catch (err) {
      setError(true);
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handlePasstoLogin=()=>{
    history.push('/Login')
  }

  const handleCloseDialog=()=>{setOpenDialog(false)}
  return (
    <>
     
    <Components.Container >

<Components.SignInContainer style={{background:'black'}}signingIn={signIn} >


</Components.SignInContainer>

<Components.OverlayContainer signingIn={signIn} >
  <Components.Overlay signingIn={signIn}>
    <Components.LeftOverlayPanel signingIn={signIn}>
      <Components.Title>New Password</Components.Title>
      
      <Components.Input type="password" placeholder="New Password" name="OTP" 
      onChange={(e) => setPassword(e.target.value)}/>

      <Components.Input type="password" placeholder="Confirm Password" name="OTP" 
      onChange={(e) => setConfirmPassword(e.target.value)}/>

      <Components.GhostButton onClick={changePassword}>
        Submit
      </Components.GhostButton>
      <h5 style={{color:'red'}}>{conf}</h5>
    </Components.LeftOverlayPanel>
    <Components.RightOverlayPanel signingIn={signIn}>
      <Components.Title>Enter OTP</Components.Title>
      <Components.Input type="text" placeholder="OTP" name="OTP" onChange={(e) => setOTP(e.target.value)}/>
      <Components.GhostButton onClick={verifyOTP}>
        Submit
      </Components.GhostButton>
      <h5 style={{color:'red'}}>{status}</h5>

      <div>
            <Dialog open={openDialog} TransitionComponent={Transition} onClose={handleCloseDialog}>
        {/* <DialogTitle>Enter Email Address</DialogTitle> */}
        <DialogContent>
          <DialogContentText>
           Password Changed Successfully
          </DialogContentText>
          
        </DialogContent>
        <DialogActions>
          
          <Button onClick={handlePasstoLogin}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
     
    </Components.RightOverlayPanel>
  </Components.Overlay>
  
</Components.OverlayContainer>

</Components.Container>
<Stack open={openA} autoHideDuration={1500} style={{margin:'-100px 50px 10px' , width:'20%'}}
onClose={handleAlertClose}>
{alert? 
<Alert onClose={handleAlertClose} style={{width:'84%'}}> OTP sent to Mail ID</Alert>:null}
</Stack>

</>
   
  );
  
}



