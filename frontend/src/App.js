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
function App() {

  const { token, removeToken, setToken } = useToken();
  
    return (

      
               <div className="min-height">

{/*     
               <Header token={removeToken}/> */}
                  <>
                  {/* <HashRouter> */}
                  <Router>

                 
                  <Nav/>
                  
                    <Routes>
                    <Route exact path='/#' element ={<Main/>}/>
                    <Route exact path='/' element ={<Main/>}/>
                  <Route exact path='/login' element ={<Login setToken={setToken}/>}/>
                  <Route exact path='/categories' element ={<Categories/>}/>
                  <Route exact path='/albums' element ={<AdminAlbums/>}/>
                  <Route exact path='/photos' element ={<PhotosAdmin/>}/>
                  <Route exact path='/about' element ={<About/>}/>
                    </Routes>
                    </Router>
               <Footer/>
                  {/* </HashRouter> */}

                 
                  </>

                </div>

   
   


   
        
    );
}
  
export default App;