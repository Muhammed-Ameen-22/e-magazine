import React, { useState, useEffect } from 'react';
import { Button } from '../button/Button';
import { Link } from 'react-router-dom';
import './navbar.css';
import axios from "axios";

function Navbar() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setLoggedIn(localStorage.getItem("loggedIn"))
    setIsAdmin(localStorage.getItem("isAdmin"))
    setUserName(localStorage.getItem('userName'))
    
  }, [localStorage.getItem("loggedIn")],[localStorage.getItem("isAdmin")], [localStorage.getItem("userName")])

  // const loggedIn=false;

  // const name = response.data.user[0].user_Name;
  // const handleLogOut=()=>{
  //   res.clearCookie("userId", { path: "/" });
  // };
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  //const [logout, handlelogout] = useState();
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  // const handlelogout = (e) => {
  //   e.preventDefault();
  //   console.log("HHelooooooooo");
  //   const res = axios.get(process.env.REACT_APP_SERVER_URL+"/logout");
  //   const res1 =  axios.get("https://www.google.com");
  //   console.log("res",res);
  // }
  const handlelogout = async (e) => {
    e.preventDefault();
    //setError(false);
    try {
      console.log("HI");
      localStorage.removeItem(loggedIn);
      localStorage.loggedIn = false;
      localStorage.isAdmin = false;
      setIsAdmin(false);

      console.log(localStorage.loggedIn);
      setLoggedIn(false);
 
      const res = await axios.get(process.env.REACT_APP_SERVER_URL + "/api/logout");
      console.log("RES" + res);
      res.data && window.location.replace("/");
    }
    catch (err) {
      //  setError(true);
    }
  };
  console.log(isAdmin);
  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            E-MAGAZINE
            <i className='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          


            {isAdmin  &&
              (<>
                <li className='nav-item'>
                  <Link
                    to='/Users'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    Users
                  </Link>
                </li>

                <li className='nav-item'>
                  <Link
                    to='/post-view-admin'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    Posts
                  </Link>
                </li>
              
              
              </>)
            } 

              {(isAdmin == false || isAdmin == null) &&
                <>
                <li className='nav-item'>
                  <Link
                    to='/'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    Home  {userName}
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    About Us
                  </Link>
                </li>
                
    
                </>
}
                  
                { !isAdmin && loggedIn ? (
                  <>
                    <li className='nav-item'>
                      <Link
                        to='/Write'
                        className='nav-links'
                        onClick={closeMobileMenu}
                      >
                        Write
                      </Link>
                    </li>
    
                    <li className='nav-item'>
                      <Link
                        to='/UserDash'
                        className='nav-links'
                        onClick={closeMobileMenu}
                      >
                        Posts
                      </Link>
                    </li>
                  </>) :
    
                  ( !isAdmin &&
                    <>
    
                      <li className='nav-item'>
                        <Link
                          to='/Login'
                          className='nav-links'
                          onClick={closeMobileMenu}
                        >
                          Posts
                        </Link>
                      </li>
                      <li>
                        <Link
                          to='/Login'
                          className='nav-links-mobile'
                          onClick={closeMobileMenu}
                        >
                          Sign Up
                        </Link>
                      </li>
    
                    </>
    
                  )
                }

              
            
          </ul>

         

          {(loggedIn || isAdmin) &&  (
            <>
              {button && <Button onClick={handlelogout} buttonStyle='btn--outline' >LOGOUT</Button>}

            </>
          )} 
          
          
          {!loggedIn && (
            <>
              {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>}

            </>
          )}



        </div>
      </nav>
    </>
  );
}
export default Navbar;