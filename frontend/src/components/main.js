import React ,{useState,useEffect} from "react";
import './../App.css';
import { Link } from "react-router-dom";

function Main(){

    const[categories,setCategories] = useState([{}]);
    const[category,setCategory] = useState(null)


    const openAlbums =()=> {
        
    }
  useEffect(() =>{

    fetch("/get_categories").then(
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
            <div className="d-flex align-items-center home-img-container justify-content-center height-100vh" >
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
                        

                        <Link to='albums'>
                        
                        <div onClick={() => localStorage.setItem("Category", file.id)} id="people-section" class='position-relative text-center gallery-preview  pb-5' >
                            
                               
                        <img src={"http://127.0.0.1:5000/get_category_image/"+file.id} id='people-img' alt={file.seo} ></img>
                        <div class='pt-5'>
                            <h1>{file.title}</h1>
                            
                                <p class='px-3 px-sm-5'>
                                {file.text}
                                </p>
                        

                        </div>
                        </div>




                        </Link>

                      )))}


        
            
           
        </div>
    


        <div class="main-container w-100  p-sm-2 p-md-2 pt-4 pt-md-4 py-2 bg-light " id="contact">
    <div class="row  d-flex justify-content-center px-2 mx-1">
        <div class="col-12 col-sm-8 col-lg-6 col-xl-6 ">

          {/*  font-family: 'Didact Gothic', sans-serif; */}
          <div class="text-center py-1 text-dark" id='contact-us-title'>
            <h3>Contact me!</h3>
          </div>
          <form class='' enctype="multipart/form-data" method="POST" >
            
              <div class="form-row ">
                <div class="col form-group">
                    <input className="form-input-email w-100" placeholder='Name'></input>
                 
                </div>

                <div class="col form-group">
                <input className="form-input-email w-100" placeholder='Surname'></input>
                  
                </div>
              </div>

            <div class="form-row">
              <div class="col form-group">
              <input className="form-input-email w-100" placeholder='Email'></input>
                  
            </div>

            <div class="col form-group">
            
               <input className="form-input-email w-100" placeholder='Phone Number'></input>
                  
            </div>
            </div>
            <div class="form-group my-2">
            <input className="form-control w-100" id='text-form' placeholder='Type your message here...'></input>
                 
            </div>
            <button type="submit" class="btn btn-black w-100 draw meet border-dark text-dark">Submit</button>
          </form>
        </div>
    </div>


  </div>

  <footer className='mt-5 w-100'>

<div id='contact-form' className="row d-flex justify-content-center px-2 mx-1 border-top border-black pt-2 position-relative" style={{backgroundColor: "rgba(255, 255, 255, .9)"}}>
 
 <div className="col-12  col-sm-6 text-dark ">
   <div className="row py-1">

     <div className="col-12  py-1 text-center">
       <p>Smotion Phography <br/>Warszawa, Zawiszy 12 01-167 <br/> Smotion.photography@smotion.pl</p>
     </div>
     <div className="col-12 ">
       <div class="row d-flex justify-content-between">
         <span style={{fontSize:"2rem"}} className='px-2'>
           <a href="" id='facebook'><i className="fab fa-facebook"></i></a>
         </span>
         <span style={{fontSize:"2rem"}} className='px-2'>
           <a href=""><i id='insta' className="fab fa-instagram"></i></a>
         </span>
         <span style={{fontSize:"2rem"}} className='px-2'>
           <a href=""><i className="fas fa-phone" style={{color:"#343a40!important"}}></i></a>
         </span>
         <span style={{fontSize:"2rem"}} className='px-2'>
           <a href=""><i className="fas fa-envelope" style={{color:"#343a40!important"}}></i></a>
         </span>
       </div>
     </div>


    
   </div>


   
 
 </div>
</div>

</footer>


      </div>

    )
}
export default Main;