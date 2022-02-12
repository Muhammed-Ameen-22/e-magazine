import React from "react";
import axios from "axios";
import { useState } from "react";
import * as Components from "./log_comp.js";
import "./login.css";

function Login() {
  const [signIn, toggle] = React.useState(true);

  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  const [name, setName] = useState("");
  const [cd, setCd] = useState("BCA");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSignIn = async(e) =>{
    e.preventDefault();
    setError(false);
    try {
      console.log("Login");
      const res = await axios.post(process.env.REACT_APP_SERVER_URL+"/loginUser", {
        email,
        password
      });
      console.log("RES"+res);
      // res.data && window.location.replace("/Write");
    } catch (err) {
      setError(true);
    }
  }
  
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
        
      });
      console.log("RES"+res);
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };

 

  return (
    
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
        
          <Components.Input type="text" placeholder="Name" name="name" onChange={(e) => setName(e.target.value)}/>
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
          <Components.Input type="email" placeholder="Email" name="email" onChange={(e) => setEmail(e.target.value)}/>
          <Components.Input type="password" placeholder="Password" name="password" onChange={(e) => setPassword(e.target.value)}/>
          <Components.Button onClick={handleSignUp}>Sign Up</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>
      <Components.SignInContainer signingIn={signIn} >
        <Components.Form>
          <Components.Title>Sign in</Components.Title>
          <Components.Input type="email" placeholder="Email" name="email" onChange={(e) => setEmail(e.target.value)}/>
          <Components.Input type="password" placeholder="Password" name="password" onChange={(e) => setPassword(e.target.value)}/>
          <Components.Anchor href="#">Forgot your password?</Components.Anchor>
          <Components.Button onClick={handleSignIn}>Sign In</Components.Button>
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
  );
}
export default Login;
// const rootElement = document.getElementById("root");

