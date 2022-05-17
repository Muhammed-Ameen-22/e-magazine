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
import { setWeekYear } from "date-fns";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function Login() {

  axios.defaults.withCredentials = true;


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
  const [signInStatus, setSignInStatus] = useState("");
const [alert,setAlert]=useState(false)
const[openA,setOpenA]=useState(false)

  const handlePass=async()=>
  {
 
console.log('Forgot Email',emailForgot)
localStorage.setItem('email',emailForgot)
let res = await axios.post(process.env.REACT_APP_SERVER_URL + "/otp/generateOTP", 
    {'email':emailForgot},{ withCredentials: true });

    if(res.data.message=='Try with registered email')
    {
      
      setTryEmail('Try with registered email')
    }
    else
    {
      window.alert('OTP SENT TO MAIL ID')
        // setTryEmail('OTP sent to mail id')
        setOpen(false);

      setAlert(true)
      console.log('alert',alert)
      
      setOpenA(true);
    
      console.log('res DATA ', res.data.key)
      localStorage.setItem('resetKey',res.data.key)
     
    history.push('/passReset')
  } 
  }

  const[tryEmail,setTryEmail]=useState('')
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

        history.push("/Write")
      }
    });
  }
  catch (err) {
    setError(true);
  }}
  ;

  useEffect(() => {
    
    axios.get(process.env.REACT_APP_SERVER_URL+"/api/login").then((response) => {
    
      // const userName=response.data.user[0].user_Name;
      // console.log(userName)
      if (response.data.loggedIn == true) {
        localStorage.setItem("loggedIn",true);
        document.cookie("isLoggedIn",true);
        history.push("/Write")
     
       
        // localStorage.setItem("username",userName);
        
          // localStorage.setItem("userName",response.data[0].user_Name);
        
          history.push("/Write")
      }
    });
  }, []);






  // const handleSignIn = async(e) =>{
  //   e.preventDefault();
  //   setError(false);
  //   try {
  //     console.log("Login");
  //     const res = await axios.post(process.env.REACT_APP_SERVER_URL+"/loginUser", {
  //       email,
  //       password
  //     // }).then((response)=>{
  //     //   if(response.data.loggedIn)
  //     //   {
  //     //     console.log("REACHED")
  //     //     localStorage.setItem("loggedIn",false);
  //     //     localStorage.setItem("username",response.data.username);
  //     //     history.push("/Write")
  //     //   }
  //     //   else
  //     //   {
  //     //     setErrorMessage(response.data.message)
  //     //   }

  //     });
  //     console.log("RES"+res);
      
  //     // res.data && window.location.replace("/Write");
  //   } catch (err) {
  //     setError(true);
  //   }
  // }
  
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(false);
    console.log("Creating user");
    try {
      console.log("creating user");
      const res = await axios.post(process.env.REACT_APP_SERVER_URL+"/createUser", {
        name,
        cd,
        email,
        password
        
      }).then((response) => {
        console.log("resp",response);
        if (response.data.message) {
          setSignInStatus(response.data.message);
          
          console.log('response',response.data.message)
        }
        
        else
        {
      // console.log("RES"+res);
      response.data && window.location.replace("/login");
        }
    })
  }
     catch (err) {
       console.log("eRRRor in singup",err);
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
     
    
    <Components.Container >


      <Components.SignUpContainer signingIn={signIn}>
        <Components.Form className="formnew">
          <Components.Title>Create Account</Components.Title>
          <Components.Group>
            <>
              <Components.Faculty>Faculty</Components.Faculty>
            </>
            <>
              <Components.CheckBoxWrapper>
                <Components.CheckBox id="checkbox" type="checkbox" checked={checked}
                  onChange={handleChange} />
                <Components.CheckBoxLabel htmlFor="checkbox" />
              </Components.CheckBoxWrapper>
            </>
          </Components.Group>
        
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
          <Components.Input type="email"  placeholder="Email" name="email" onChange={(e) => setEmail(e.target.value)}/>
          <Components.Input type="password" placeholder="Password" name="password" onChange={(e) => setPassword(e.target.value)}/>
          <Components.Button onClick={handleSignUp}>Sign Up</Components.Button>
          
          <h5 style={{color:'red'}}>{signInStatus}</h5>
        </Components.Form>
      </Components.SignUpContainer>
      <Components.SignInContainer signingIn={signIn} >
        <Components.Form>
          <Components.Title>Sign in</Components.Title>
          <Components.Input type="email" placeholder="Email" name="email" onChange={(e) => setEmail(e.target.value)}/>
          <Components.Input type="password" placeholder="Password" name="password" onChange={(e) => setPassword(e.target.value)}/>
          <Components.Anchor href="#" onClick={handleClickOpen}>Forgot your password?</Components.Anchor>
          <Components.Button onClick={handleSignIn}>Sign In</Components.Button>
          <h5 style={{color:'red'}}>{loginStatus}</h5>
          <h3 style={{color:"red", fontSize:"13px"}}>{errorMessage}</h3>
          
          <div>
            <Dialog open={open} TransitionComponent={Transition} onClose={handleClose}>
        {/* <DialogTitle>Enter Email Address</DialogTitle> */}
        <DialogContent>
          <DialogContentText>
           Enter the Email of your account
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e)=>setEmailForgot(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlePass}>Submit</Button>
          
        </DialogActions>
        <h5 style={{marginLeft:'46px',color:'red'}}>{tryEmail}</h5>
      </Dialog>
    </div>
     
        </Components.Form>
      
      </Components.SignInContainer>
      <Components.OverlayContainer signingIn={signIn} >
        <Components.Overlay signingIn={signIn}>
          <Components.LeftOverlayPanel signingIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep connected with us please login with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>
          <Components.RightOverlayPanel signingIn={signIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Enter your personal details and start journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sign Up
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
export default Login;
// const rootElement = document.getElementById("root");

