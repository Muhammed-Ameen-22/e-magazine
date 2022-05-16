import React ,{useEffect} from 'react';
// import './adminNav.css';

import AdminNav from './AdminNav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Users from './Users';
import Postview from './Postview';
import Contest from './Contest';
// import collapseTab from './collapseTab';
// import Home from './pages/Home';
// import Reports from './pages/Reports';
// import Products from './pages/Products';

function AdminDash() {
    console.log('HI'); 
    useEffect(() => {
      if (sessionStorage.getItem('Refreshed') == null) {
        sessionStorage.setItem('Refreshed', 'true')
        console.log('yes')
        window.location.reload();
      } else {
        console.log('no')
      }
      
    }, []);
    return (
      
    <>
   
      <Router>
      
        <Switch>
          <Route path='/Users' exact component={Users} />
          <Route path='/Postview' component={Postview} />
          <Route path='/Contest' component={Contest} />
         
        </Switch>
      </Router>
      <h1 style={{margin:'314px 1px 1px', fontSize:'48px'}}>WELCOME ADMIN</h1>
    </>
  );
}

export default AdminDash;