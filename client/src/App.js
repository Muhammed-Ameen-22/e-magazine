import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import './App.css';
import Home from './pages/home/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Write from './pages/write/Write';
import Login from './pages/login/Login';

import AdminDash from './pages/admin/AdminDash';

import UserDash from './pages/user/UserDash';
import PostView from './pages/user/PostView'
import Users from './pages/admin/Users';
import Postview from './pages/admin/Postview';

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

  return (
    <>
      <Router>
        <Navbar />
        
        <Switch>
       

          <Route path='/' exact component={Home} />
          <Route path='/PostView' component={PostView}/>
          <Route path='/UserDash' component={UserDash}/>
          
          
          {/* {this.isAdmin && <Route path='/services' component={Services} /> }  */}
      
          
          <Route path='/Write' component={Write} />
          <Route path='/Login' component={Login} />
          {/* <Route path='/AdminLogin' component ={AdminLogin} /> */}

          <Route path='/AdminDash' component={AdminDash} /> 


          <Route path='/Users' exact component={Users} />
          <Route path='/post-view-admin' component={Postview} />


        </Switch>
      </Router>
    </>
  );
}

export default App;
