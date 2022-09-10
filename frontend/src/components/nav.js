import React ,{useState,useEffect} from "react";
import './../App.css';
import logo from './../images/logo_nav.png'
import { Link } from "react-router-dom";
import Instagram from './../images/icons8-instagram-48.png'
import Login from './login.js'
import Header from './header'
import useToken from './useToken'


function Nav(){
  const { token, removeToken, setToken } = useToken();
    const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("token")|| false));
    
    const setFocus = (focusOn) => {
        localStorage.setItem("focusOn", focusOn);
        console.log(focusOn)
      };



  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token) {
      setauthenticated(true);
    } else {
      setauthenticated(false);
    }
  }, []);
    return(

        <div className="navContainer">
          {token ?  <Header token={removeToken}/>:(
   null

          )}
          
{/* <div className="d-flex justify-content-center">
<Link to='/'>

  <a class="navbar-brand px-1" href="#" id='logo'>
    <img src={logo} class="d-inline-block align-top" alt=""/>
  </a>
  </Link>

</div> */}

<nav class="navbar navbar-expand-xl navbar-dark fixed p-5">


  <div class="container-fluid">
  
  {/* <a class="navbar-brand " href="#" id='logo-title'></a> */}
  <Link to='/'>

  <a class="navbar-brand px-1" href="#" id='logo'>
    <img src={logo} class="d-inline-block align-top" alt=""/>
  </a>
  </Link>


    
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse  justify-content-end" id="navbarNav">
      <ul class="navbar-nav  text-center">

        <Link to='/'>
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="#home">Home</a>
        </li>
        </Link>
        <Link to='/photos'>
        <li class="nav-item">
          <a class="nav-link" href="#about">Gallery</a>
        </li>
        </Link>
        <li class="nav-item">
          <a class="nav-link" href="#about">About Me</a>
        </li>
        

        {/* {token ? null:(
            <Link to='/login'>
            <li class="nav-item">
              
            <a className="nav-link" href="">Admin</a>
            </li>
            </Link>
        )} */}
       
        
        {token ? (
            <Link to='/categories'>
            <li class="nav-item">
            <a class="nav-link "onClick={()=> setFocus("Categories")} href="">Categories</a>
            </li>
            </Link>
        ):null}

               {token? (
                <Link to='/albums'>

<li class="nav-item">
<a class="nav-link " onClick={()=> setFocus("Albums")} href="#">Albums</a>
</li>
</Link>
):null}

{token? (
 <Link to='/photos'>
<li class="nav-item">
<a onClick={()=> setFocus("Pictures")} class="nav-link " href="#">Pictures</a>
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