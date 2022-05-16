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
  const handleSignIn = async(e) => {
    e.preventDefault();
    setError(false);
    try{
      const res = await axios.post(process.env.REACT_APP_SERVER_URL+"/api/login", {
      email: email,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      }else if (response.data.isadmin === true){
        localStorage.setItem("isAdmin",true);
        history.push("/AdminDash");
      } 
      
      else {
        localStorage.setItem("loggedIn",true);
        // setLoginStatus(response.data[0].user_Email);
        history.push("/Write")
      }
    });
  }
  catch (err) {
    setError(true);
  }}
  ;

//   useEffect(() => {
    
//     // axios.get(process.env.REACT_APP_SERVER_URL+"/api/login").then((response) => {
    
//     //   // const userName=response.data.user[0].user_Name;
//     //   // console.log(userName)
//     //   if (response.data.loggedIn == true) {
//     //     localStorage.setItem("loggedIn",true);
//     //     document.cookie("isLoggedIn",true);
//     //     history.push("/Write")
//     //     // setLoginStatus(response.data.user[0].user_Email);
       
//     //     // localStorage.setItem("username",userName);
        
//     //       // localStorage.setItem("userName",response.data[0].user_Name);
        
//     //       history.push("/Write")
//     //   }
//     // });
//   }, []);





  
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
      console.log("RES"+res);
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

  return (
    <>
     
    
    {/* <Components.Container >


      <Components.SignUpContainer signingIn={signIn}>
        <Components.Form className="formnew">
          <Components.Title>Enter OTP</Components.Title>
          <Components.Input type="text" placeholder="OTP" name="OTP" onChange={(e) => setName(e.target.value)}/>
          <Components.Button onClick={() => toggle(true)}>Sign Up</Components.Button>
      </Components.Form>
      </Components.SignUpContainer>
      
      <Components.SignInContainer signingIn={signIn}>
        <Components.Form className="formnew">
          <Components.Title>Enter OTP</Components.Title>
          <Components.Input type="text" placeholder="OTP" name="otp" onChange={(e) => setName(e.target.value)}/>
          <Components.Button onClick={handleValOTP}>Sign Up</Components.Button>
       
          
      </Components.Form>
      </Components.SignInContainer>


      <Components.OverlayContainer signingIn={signIn} >
        <Components.Overlay signingIn={signIn}>
          <Components.LeftOverlayPanel signingIn={signIn}>

          </Components.LeftOverlayPanel>
          <Components.RightOverlayPanel signingIn={signIn}>
      
          </Components.RightOverlayPanel>
        </Components.Overlay>
        
      </Components.OverlayContainer>
      
      
    </Components.Container>
    

    </> */}
    
  
  
  
    <Components.Container >

{/* 
<Components.SignUpContainer signingIn={signIn}>
  <Components.Form className="formnew"> */}
    {/* <Components.Title>Create Account</Components.Title>
    
  
    <Components.Input type="text" placeholder="Name" name="name" onChange={(e) => setName(e.target.value)} required="true" />
    { checked && (
    <Components.Select id="faculty" name="cd"  onChange={(e) => setCd(e.target.value)}>
      <Components.Option value="Dept of CS">Dept of CS</Components.Option>
      <Components.Option value="Dept of Commerce">Dept of Commerce</Components.Option>
      <Components.Option value="Dept of English">Dept of English</Components.Option>
      <Components.Option value="Dept of Animation">Dept of Animation</Components.Option>
    </Components.Select>
    )}
      { !checked && (
    <Components.Select id="student" name="cd" onChange={(e) => setCd(e.target.value)}>
      <Components.Option value="BCA">BCA</Components.Option>
      <Components.Option value="BBA">BBA</Components.Option>
      <Components.Option value="BAE">BAE</Components.Option>
      <Components.Option value="BBA">BAA</Components.Option>
    </Components.Select>
      )}
    {/* <Components.Input type="text" placeholder="Course/Department" /> */}
    {/* <Components.Input type="email"  placeholder="Email" name="email" onChange={(e) => setEmail(e.target.value)}/>
    <Components.Input type="password" placeholder="Password" name="password" onChange={(e) => setPassword(e.target.value)}/>
    <Components.Button onClick={handleSignUp}>Sign Up</Components.Button> */} 
    
    {/* <h5 style={{color:'red'}}>{signInStatus}</h5> */}
  {/* </Components.Form>
</Components.SignUpContainer> */}


<Components.SignInContainer style={{background:'black'}}signingIn={signIn} >
  {/* <Components.Form>
    <Components.Title>Enter OTP</Components.Title>
    <Components.Input type="text" placeholder="OTP" name="OTP" onChange={(e) => setEmail(e.target.value)}/>
   
   
    <Components.Button onClick={() => toggle(false)}>Submit</Components.Button>
    
    <h3 style={{color:"red", fontSize:"13px"}}>{errorMessage}</h3>

  </Components.Form> */}

</Components.SignInContainer>

<Components.OverlayContainer signingIn={signIn} >
  <Components.Overlay signingIn={signIn}>
    <Components.LeftOverlayPanel signingIn={signIn}>
      <Components.Title>New Password</Components.Title>
      
      <Components.Input type="text" placeholder="New Password" name="OTP" onChange={(e) => setEmail(e.target.value)}/>
      <Components.Input type="text" placeholder="Confirm Password" name="OTP" onChange={(e) => setEmail(e.target.value)}/>
      <Components.GhostButton onClick={() => toggle(true)}>
        Submit
      </Components.GhostButton>
    </Components.LeftOverlayPanel>
    <Components.RightOverlayPanel signingIn={signIn}>
      <Components.Title>Enter OTP</Components.Title>
      <Components.Input type="text" placeholder="OTP" name="OTP" onChange={(e) => setEmail(e.target.value)}/>
      <Components.GhostButton onClick={() => toggle(false)}>
        Submit
      </Components.GhostButton>
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



