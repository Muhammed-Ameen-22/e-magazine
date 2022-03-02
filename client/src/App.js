import React from 'react';
import Navbar from './components/navbar/Navbar';
import './App.css';
import Home from './pages/home/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Services from './components/pages/Services';
import Write from './pages/write/Write';
import Login from './pages/login/Login';
import AdminDash from './pages/admin/AdminDash';
import UserDash from './pages/user/UserDash';
import PostView from './pages/user/PostView'
function App() {
  return (
    <>
      <Router>
        <Navbar />
        
        <Switch>

          <Route path='/' exact component={Home} />
          <Route path='/PostView' component={PostView}/>
          <Route path='/UserDash' component={UserDash}/>
          <Route path='/AdminDash' component={AdminDash} />
          {/* <Route path='/services' component={Services} /> */}
          <Route path='/Write' component={Write} />
          <Route path='/Login' component={Login} />
        
        </Switch>
      </Router>
    </>
  );
}

export default App;
