import React from 'react';
// import './adminNav.css';

import AdminNav from './AdminNav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Users from './Users';
import Postview from './Postview';
import Category from './Contest';
// import collapseTab from './collapseTab';
// import Home from './pages/Home';
// import Reports from './pages/Reports';
// import Products from './pages/Products';

function AdminDash() {
    console.log('HI'); 
    return (
      
    <>
    
      <Router>
      
        <Switch>
          <Route path='/Users' exact component={Users} />
          <Route path='/Postview' component={Postview} />
          <Route path='/Category' component={Category} />
         
        </Switch>
      </Router>
    </>
  );
}

export default AdminDash;