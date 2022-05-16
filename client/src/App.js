import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import './App.css';
import Home from './pages/home/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Write from './pages/write/Write';
import Login from './pages/login/Login';
import passReset from './pages/login/passReset';

import AdminDash from './pages/admin/AdminDash';
import Contest from './pages/admin/Contest'
import UserDash from './pages/user/UserDash';
import PostView from './pages/user/PostView'
import Users from './pages/admin/Users';
import Postview from './pages/admin/Postview';
import UserWorks from './pages/user/UserWorks';
import { ContentPasteGo } from '@mui/icons-material';
import UserContest from './pages/user/UserContest'
import UserContestView from './pages/user/UserContestView';
import UserCompContestView from './pages/user/UserCompContestView';

function App() {

  // const [isAdmin, setIsAdmin] = useState(false);
  // let AdminDash,Services;

  // if(localStorage && localStorage.getItem("isAdmin") == true){
  //   setIsAdmin(true);
  //   // AdminDash = import('./pages/admin/AdminDash');
  //   // Services = import('./components/pages/Services');
  // }
  // else {
  //   setIsAdmin(false);
  // }

  const [loggedIn, setLoggedIn] = useState(
    // initial value
    // document.cookie.split(';').some((item) => item.trim().startsWith('token=')));
    localStorage.getItem("loggedIn"));

  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin"));
  
    
    console.log("cookie",localStorage.getItem("loggedIn"));
    console.log("val of logged in",loggedIn);

  return (
    <>
      <Router>
        <Navbar  {...{loggedIn,isAdmin}} />
        
        <Switch>
       

          <Route path='/' exact component={Home} />
          <Route path='/PostView' component={PostView}/>
          <Route path='/UserDash' component={UserDash}/>
          
          <Route path='/UserContest' component={UserContest}/>
          <Route path='/UserContestView' component={UserContestView}/>
          <Route path='/UserCompContestView' component={UserCompContestView}/>
          
          {/* {this.isAdmin && <Route path='/services' component={Services} /> }  */}
      
          
          <Route path='/Write' component={Write} />
          <Route path='/Login' component={Login} />
          <Route path='/passReset' component={passReset} />

          {/* <Route path='/AdminLogin' component ={AdminLogin} /> */}

          <Route path='/AdminDash' component={AdminDash} /> 
          <Route path='/Contest' component={Contest} />

          <Route path='/Users' exact component={Users} />
          <Route path='/post-view-admin' component={Postview} />
          <Route path='/UserWorks' component={UserWorks}/>

        </Switch>
      </Router>
    </>
  );
}

export default App;
