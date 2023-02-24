// Importing modules
import React, { useState, useEffect,useReducer,
  createContext,
  useContext } from "react";
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
import Feedback from "./components/feedback";


const showFeedbackContext = createContext();
const dispatchFeedbackContext = createContext();
const FeedbackReducer = (state, action) => {
  return {
    message: action.message,
    type: action.type,
  };
};
const Feedbackstates = {
  message: "",
  type: "",
};
function App() {
  const [feedback, setFeedback] = useReducer(FeedbackReducer, Feedbackstates);
  const { token, removeToken, setToken } = useToken();
  const[currentUrl,setCurrentUrl] = useState("/")

  const setUrl = (newUrl) => {
    
    setCurrentUrl(newUrl);
    console.log(currentUrl)
  }

    return (
      <dispatchFeedbackContext.Provider value={setFeedback}>
      <showFeedbackContext.Provider value={feedback}>
      
               <div className="min-height">
               <Feedback />
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

   
                </showFeedbackContext.Provider>
        </dispatchFeedbackContext.Provider>


   
        
    );
}
  
export default App;

export const DispatchFeedbackContexts = () =>useContext(dispatchFeedbackContext);
export const ShowFeedbackContexts = () => useContext(showFeedbackContext);