// Importing modules
import React, { useState, useEffect } from "react";
import "./App.css";

import Nav from './components/nav';
import Main from './components/main';
import Login from './components/login';
import { BrowserRouter as Router, Routers,Switch, Route, Routes } from "react-router-dom";
import Categories from './components/categories'
import useToken from './components/useToken'
import Header from './components/header'
import { HashRouter } from 'react-router-dom'
import AdminAlbums from './components/adminalbums'
import PhotosAdmin from './components/photosadmin'
import About from './components/about'
import Footer from "./components/footer";
import backgroundimg from './images/home-background-phone.jpg'

function App() {

  const { token, removeToken, setToken } = useToken();
  const[currentUrl,setCurrentUrl] = useState("/")

  const setUrl = (newUrl) => {
    
    setCurrentUrl(newUrl);
    console.log(currentUrl)
  }

    return (

      
               <div className="min-height">

              <img id="background" src={backgroundimg}></img>
                  <>
                  <HashRouter basename={process.env.PUBLIC_URL}>
                
                
                 
                  <Nav setUrl={setUrl} token={token} currentUrl={currentUrl}/>
                  
                    <Routes>
                   

                    <Route exact path='/' element={<Main setUrl={setUrl}/>}>
                    </Route>
                    <Route exact path='/login' element ={<Login setToken={setToken}/>}/>
                    {/* <Route exact path='/categories' element ={<Categories token={token}/>}/> */}
                    <Route exact path='/albums' element ={<AdminAlbums token={token}/>}/>
                    <Route exact path='/photos' element ={<PhotosAdmin token={token}/>}/>
                    <Route exact path='/about' element ={<About token={token}/>}/>
                    </Routes>
                  
               <Footer/>
                  </HashRouter>

                 
                  </>

                </div>

   
   


   
        
    );
}
  
export default App;