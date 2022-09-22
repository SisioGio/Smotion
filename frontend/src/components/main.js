import React ,{useState,useEffect} from "react";
import './../App.css';
import { Link } from "react-router-dom";
import Contact from "./contact";
function Main(){

    const[categories,setCategories] = useState([{}]);
    const[category,setCategory] = useState(null)


    const openAlbums =()=> {
        
    }
  useEffect(() =>{

    fetch("/get_albums/").then(
      res => res.json()
    ).then(
      data => {
        setCategories(data);
        console.log(data)
      }
    )
  },[])


    return(
        <div className="row d-flex justify-content-center  " id='main-external'>
     


        <div className="col-12 pb-5 align-bottom"  id='home'>
            <div className="d-flex align-items-center home-img-container justify-content-center min-height" >
            <div className="text-center">

                <h1>SMotion Photography</h1>
                <p className="py-2">Weddings - Events - People - Food</p>
                <p className="py-2">Warsaw, Poland</p>
                <div>
                <a href="#contact-form" className="btn btn-black position-relative text-dark">Contact Me</a>
                </div>
            
            </div>
            
            
            </div>
        </div>

        
        <div className="col-12 pb-5 align-bottom"  id='categories'>

        {(typeof categories.files === 'undefined') ? (
                      <p>Loading...</p>
                    ) : (



                        
                      categories.files.map((file,i)=> (
                        

                        <Link to='photos'>
                        
                        <div onClick={() => localStorage.setItem("Album", file.id)} id="people-section" class='position-relative text-center gallery-preview  pb-5' >
                            
                               
                        <img src={"https://calm-wave-28039.herokuapp.com/get_album_img/"+file.id} id='people-img' alt={file.seo} ></img>
                        <div class='pt-5'>
                            <h1>{file.title}</h1>
                            
                                {/* <p class='px-3 px-sm-5'>
                                {file.text}
                                </p> */}
                        

                        </div>
                        </div>




                        </Link>

                      )))}


        
            
           
        </div>
    

<Contact/>
 




      </div>

    )
}
export default Main;