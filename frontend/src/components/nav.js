import React ,{useState,useEffect} from "react";
import './../App.css';
import logo from './../images/logo_nav.png'
import { Link } from "react-router-dom";
import Instagram from './../images/icons8-instagram-48.png'
import Login from './login.js'
import Header from './header'
import useToken from './useToken'
import { NavHashLink } from 'react-router-hash-link';

function Nav(){
  const { token, removeToken, setToken } = useToken();
  const[currentPath,setCurrentPath] = useState(null)
    const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("token")|| false));
    
    const setFocus = (focusOn) => {
        localStorage.setItem("focusOn", focusOn);
        console.log(focusOn)
      };

      const updatePath = () => {
        setCurrentPath(window.location.pathname);
        console.log("Chanding path to " + window.location.pathname)
      };
   




  useEffect(() => {
   
    const token = localStorage.getItem("token");
    
    if (token) {
      setauthenticated(true);
    } else {
      setauthenticated(false);
    }
  }, [currentPath]);



    return(

        <div className="navContainer">
          
          {token ?  <Header token={removeToken}/>:(
   null

          )}
          


<nav class="navbar navbar-expand-xl navbar-dark fixed ">


  <div class="container-fluid">
  

  <Link to='/'>

  <a class="navbar-brand px-1" onClick={()=>setCurrentPath("/")} href="#main-external" id='logo'>
    <img src={logo} class="d-inline-block align-top" alt=""/>
  </a>
  </Link>


    
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse  justify-content-end" id="navbarNav">
     
      <ul class="navbar-nav  text-center">

        {currentPath==="/" || currentPath === null?(
          <li class="nav-item">
               <NavHashLink to="#home" onClick={()=>setCurrentPath("/")} className="nav-link"
          >
           Home

          </NavHashLink>
              </li>
          
          // <li class="nav-item">
          //       <a onClick={()=>setCurrentPath("/")} class="nav-link" aria-current="page" href="#/#home">Home</a>
          //     </li>
        ):(
          <Link to='/'>
              <li class="nav-item">
                <a onClick={()=>setCurrentPath("/")} class="nav-link" aria-current="page" href="#home">Home</a>
              </li>
        </Link>
        )}  
        

       
        <Link to='/about'>
        <li class="nav-item">
          <a onClick={()=>setCurrentPath("about")} class="nav-link" href="#about">About Me</a>
        </li>
        </Link>
       
        {currentPath ==="/"?(
            <li class="nav-item">
            <NavHashLink to="#contact" onClick={()=>setCurrentPath("/")} className="nav-link"
       >
        Contact

       </NavHashLink>
           </li>
        ):(
null
        )}
        
        {token ? (null):(
          <Link to='/login'>
        
        <li class="nav-item">
                <a class="nav-link " onClick={()=> (setCurrentPath("login"))} href="#">Login</a>
                </li>
        </Link>
        )}
        


               {token? (
                <Link to='/albums'>

                <li class="nav-item">
                <a class="nav-link " onClick={()=> (setCurrentPath("albums"),setFocus("Albums"))} href="#">Albums</a>
                </li>
</Link>
):null}

{token? (
 <Link to='/photos'>
<li class="nav-item">
<a onClick={()=> (setFocus("Pictures"),setCurrentPath("pics"))} class="nav-link " href="#">Pictures</a>
</li>
</Link>
):null}
   
       
        
        
      </ul>
    </div>
  </div>
</nav>
  
        </div>
      


    )
}
export default Nav;