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

import AdminAlbums from './components/adminalbums'
import PhotosAdmin from './components/photosadmin'
function App() {

  const { token, removeToken, setToken } = useToken();
  
    return (

      <Router>
               <div className="">

{/*     
               <Header token={removeToken}/> */}
                  
                  <Nav/>
                  <Routes>

                  <Route exact path='/' element ={<Main/>}/>
                  <Route exact path='/login' element ={<Login setToken={setToken}/>}/>
                  <Route exact path='/categories' element ={<Categories/>}/>
                  <Route exact path='/albums' element ={<AdminAlbums/>}/>
                  <Route exact path='/photos' element ={<PhotosAdmin/>}/>
                  </Routes>


                </div>

    </Router>
   


   
        
    );
}
  
export default App;