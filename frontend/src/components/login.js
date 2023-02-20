import React,{useState}  from "react";
import './../App.css';
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(props){
    const navigate = useNavigate();
    const [loginForm, setloginForm] = useState({
        email: "",
        password: ""
      })
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));

    const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

    
    function logMeIn(event) {
      

        axios({
          method: "POST",
          url:"/token",
          data:{
            email: loginForm.email,
            password: loginForm.password
           }
        })
        .then((response) => {
          console.log(response.data.access_token)
          props.setToken(response.data.access_token);
            
          navigate("/");
          window.location.reload(false)  
          
        //   localStorage.setItem("access_token", response.data.access_token);
          
        }).catch((error) => {
          if (error.response) {
            console.log("Error during logging...")
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            }
        })
  
        setloginForm(({
          email: "",
          password: ""}))
  
        event.preventDefault()
      }

      function handleChange(event) { 
        const {value, name} = event.target
        setloginForm(prevNote => ({
            ...prevNote, [name]: value})
        )}


    return(

        
      
            <div className="d-flex align-items-center home-img-container justify-content-center height-100vh"  >
            <div className="text-center" id='login-form'>

                <h2>Login</h2>
                <form>


                    <div className="input-container py-3">
                        
                        <input onChange={handleChange} type={loginForm.email} name="email"  text={loginForm.email} className="p-2"  required placeholder="Username" value={loginForm.email}/>
                        {renderErrorMessage("uname")}
                    </div>
                    <div className="input-container py-3">
                        
                        <input onChange={handleChange} type="password" name="password"  text={loginForm.password}  className="p-2"   required placeholder="Password" value={loginForm.password}/>
                        {renderErrorMessage("pass")}
                    </div>
                    <div className="btn btn-black position-relative text-dark w-100 py-1  border-round" id='submit-button'>
                        <input onClick={logMeIn} type="submit" />
                    </div>


                    </form>
                
            
            </div>
            </div>

    )
}
export default Login;