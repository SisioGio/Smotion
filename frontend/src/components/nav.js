import React ,{useState,useEffect} from "react";
import './../App.css';
import logo from './../images/logo_nav.png'
import { Link } from "react-router-dom";
// import Instagram from './../images/icons8-instagram-48.png'
// import Login from './login.js'
// import Header from './header'
import useToken from './useToken'
import { NavHashLink } from 'react-router-hash-link';
import axios from "axios";

function Nav(props){


  const { token, removeToken, setToken } = useToken();
  const[currentPath,setCurrentPath] = useState(props.currentUrl)
    const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("token")|| false));
    
    const setFocus = (focusOn) => {
        localStorage.setItem("focusOn", focusOn);
        console.log(focusOn)
      };

      const updatePath = () => {
        setCurrentPath(window.location.pathname);
        console.log("Chanding path to " + window.location.pathname)
      };
   
      function logMeOut() {
        console.log("Logging out")
        axios({
          method: "POST",
          url:"/logout",
        })
        .then((response) => {
          console.log(response)
          removeToken()
          window.location.reload(false);
    
        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            }
        })}



  useEffect(() => {
   
    const token = props.token;
    
    if (token) {
      setauthenticated(true);
    } else {
      setauthenticated(false);
    }
  }, [currentPath]);



    return(

        <div className="navContainer">

<p>{token}</p>


<nav class="navbar navbar-expand-md navbar-light fixed ">

  <div class="container-fluid">
  

  <Link to='/'>

  <a class="navbar-brand px-1" onClick={()=>props.setUrl("/")} href="#main-external" id='logo'>
    <img src={logo} class="d-inline-block align-top" alt=""/>
  </a>
  </Link>


    
    <button class="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse  justify-content-end" data-toggle="collapse"  data-target=".navbar-collapse" id="navbarNav">
     
      <ul class="navbar-nav  text-center">

        {props.currentUrl==="/" || props.currentUrl === null?(
          <li class="nav-item">
               <NavHashLink to="#home"  onClick={()=>props.setUrl("/")} className="nav-link"
          >
            <span data-bs-toggle="collapse" data-bs-target="#navbarNav">Home</span>
          

          </NavHashLink>
              </li>
       
        ):(
          <Link to='/'>
              <li class="nav-item">
                <a onClick={()=>props.setUrl("/")} class="nav-link"  aria-current="page" href="#home">
                <span data-bs-toggle="collapse" data-bs-target="#navbarNav">Home</span>
                </a>
              </li>
        </Link>
        )}  
        
        <Link to='/about'>
        <li class="nav-item">
          <a onClick={()=>props.setUrl("about")} class="nav-link" href="#about"><span data-bs-toggle="collapse" data-bs-target="#navbarNav">About me</span></a>
        </li>
        </Link>
        <Link to='/photos'>
        <li class="nav-item">
          <a onClick={()=>props.setUrl("photos")} class="nav-link" href="#gallery"><span data-bs-toggle="collapse" data-bs-target="#navbarNav">Gallery</span></a>
        </li>
        </Link>
        {props.currentUrl ==="/"?(
            <li class="nav-item">
            <NavHashLink to="#contact" onClick={()=>props.setUrl("/")} className="nav-link"
              ><span data-bs-toggle="collapse" data-bs-target="#navbarNav">Contact</span></NavHashLink>
           </li>
        ):(
          null
        )}
        
               {token? (
                <Link to='/albums'>

                <li class="nav-item">
                <a class="nav-link " onClick={()=> (props.setUrl("albums"),setFocus("Albums"))} href="#"><span data-bs-toggle="collapse" data-bs-target="#navbarNav">Albums</span></a>
                </li>
              </Link>
              ):null}

          {token? (
          <Link to='/photos'>
          <li class="nav-item">
          <a onClick={()=> (setFocus("Pictures"),props.setUrl("pics"))} class="nav-link " href="#"><span data-bs-toggle="collapse" data-bs-target="#navbarNav">Pictures</span></a>
          </li>
          </Link>
          ):null}


           {token ? (
   
            
    <li class="nav-item">
            <a class="nav-link " onClick={()=> (logMeOut(),props.setUrl("/"))} href="#"><span data-bs-toggle="collapse" data-bs-target="#navbarNav">Logout</span></a>
            </li>
   
        ):(null
         
        )}
       
        
        
      </ul>
    </div>
  </div>
</nav>
  
        </div>
      


    )
}
export default Nav;