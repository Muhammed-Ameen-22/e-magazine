import React, { useState, useEffect } from 'react';
import { Button } from '../button/Button';
import { Link } from 'react-router-dom';
import './navbar.css';
import axios from "axios";

function Navbar(props) {

  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setLoggedIn(localStorage.getItem("loggedIn"))
    setIsAdmin(localStorage.getItem("isAdmin"))
    setUserName(localStorage.getItem('userName'))

  }, [localStorage.getItem("loggedIn")], [localStorage.getItem("isAdmin")], [localStorage.getItem("userName")])

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

      localStorage.removeItem(loggedIn);
      localStorage.loggedIn = false;
      localStorage.isAdmin = false;
      setIsAdmin(false);
      setLoggedIn(false);
      sessionStorage.removeItem('Refreshed');

      const res = await axios.get(process.env.REACT_APP_SERVER_URL + "/api/logout");
      // console.log("RES" + res);
      console.log("props", props);
      return res && window.location.replace("/");

    }
    catch (err) {
      //  setError(true);
    }
  };
  // console.log("isadmin", isAdmin);
  // console.log("Isloggedin", loggedIn);
  console.log("props", props);
  console.log("props", props.isAdmin =="false" );
  console.log("props", props.loggedIn);
  window.addEventListener('resize', showButton);

  if (props.loggedIn == "true") {
    
    console.log("Rendering loggedin", props.loggedIn);
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
                <li className='nav-item'>
                  <Link
                    to='/UserContest'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    Contest
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/UserWorks'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    My Works
                  </Link>
                </li>
              </>






            </ul>



            <>
              {<Button onClick={handlelogout} buttonStyle='btn--outline' >LOGOUT</Button>}

            </>




          </div>
        </nav>
      </>
    );
  }
  

  else if(props.isAdmin == "true") {
    return (
      <>
        <nav className='navbar'>
          <div className='navbar-container'>
            <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
              E-MAGAZINE [ADMIN]
              <i className='fab fa-typo3' />
            </Link>
            <div className='menu-icon' onClick={handleClick}>
              <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>




                <>
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

                  <li className='nav-item'>
                    <Link
                      to='/Contest'
                      className='nav-links'
                      onClick={closeMobileMenu}
                    >
                      Contest
                    </Link>
                  </li>

                </>
              

         

       

       



            </ul>
            {<Button onClick={handlelogout} buttonStyle='btn--outline' >LOGOUT</Button>}





          </div>
        </nav>
      </>
    );
  }

  else if((props.loggedIn == "false" || props.loggedIn == null) && (props.isAdmin == "false" || props.isAdmin == null) ) {
    console.log("Rendering logged out")
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
              

         

                <>


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


              



            </ul>


            <>
              {<Button buttonStyle='btn--outline'>SIGN UP</Button>}
            </>


          </div>
        </nav>
      </>
    );
  }
  else{
    console.log("Rendiering else")
  }
}
export default Navbar;