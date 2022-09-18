import logo from '../logo.svg'
import axios from "axios";


function Header(props) {

  function logMeOut() {
    console.log("Logging out")
    axios({
      method: "POST",
      url:"/logout",
    })
    .then((response) => {
      console.log(response)
       props.token()

    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

    return(
        <header className="App-header">
           <small>
           <button onClick={logMeOut}> 
                Logout
            </button>
           </small>
            
        </header>
    )
}

export default Header;