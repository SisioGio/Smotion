import React,{ useEffect, useState,useRef } from "react";

import axios from "axios";
import { Link } from "react-router-dom";

function AdminAlbums() {
const[album_id,setAlbumID]=useState(null)
const[input,setInput]=useState(false);
const[data,setData] = useState([{}]);
const[inputType,setInputType]=useState("New")
const [selectedFile, setSelectedFile] = useState([]);
const [albumPicture, setAlbumPicture] = useState(null);

const[feedback,setFeedback] = useState(null)

  const [albumForm, setAlbumForm] = useState({
    title: "",
    seo:"",
    category_id:"",


  })

    const handleFileInput = (e) => {
        // handle validations
        e.preventDefault();
        const file = e.target.files;
        setSelectedFile(file);
        console.log(file)
        
      };


  
      const handleAlbumPicture = (e) => {
        // handle validations
        const file = e.target.files[0];
        setAlbumPicture(file)
      

      };

    
  useEffect(() =>{

    fetch("/get_albums").then(
      res => res.json()
    ).then(
      data => {
        setData(data);
        console.log(data)
      }
    )
  },[])
  


  const submitForm = (event) => {
 
    event.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < selectedFile.length; i++) {
        formData.append("file", selectedFile[i]);
      }
    formData.append("album_file",albumPicture)
    formData.append("title",albumForm.title)
    formData.append("seo",albumForm.seo)
      axios
      .post("/new_album/", formData,
      {headers:
        {
        'Content-Type':'application/json'
      },
      maxBodyLength: 10000000,
      maxContentLength: 10000000},
      )
      .then((res) => {
        console.log(res)
        fetch("/get_albums").then(
          res => res.json()
        ).then(
          data => {
            setData(data);
            console.log(data)
          }
        )

        
      })
      .catch((err) => {
        console.log(err)
      }
     
        );
    } 

    const updateAlbum = (event) => {
       // event.preventDefault();
    const formData = new FormData();
    formData.append("album_file",albumPicture)
    formData.append("title",albumForm.title)
    formData.append("seo",albumForm.seo)
    formData.append("album_id",album_id)
    
      axios
      .post("/update_album/", formData,
      {headers:
        
        {
        'Content-Type':'application/json'
      }}
      )
      .then((res) => {
        console.log(res)

        
      })
      .catch((err) => {
        alert("File Upload Error")
    console.log(err)}); 




    }
    const deleteAlbum = (event) => {
        const formData = new FormData();

        event.preventDefault();
    formData.append("album_id",album_id)
    
      axios
      .post("/delete_album/", formData,
      {headers:
        
        {
        'Content-Type':'application/json'
      }}
      )
      .then((res) => {
        console.log(res)
        fetch("/get_albums").then(
          res => res.json()
        ).then(
          data => {
            setData(data);
            console.log(data)
          }
        )


        
      })
      .catch((err) => {
        alert("File Upload Error")
      console.log(err)
      });
      setInput(false)
    }
    

  function handleChange(event) { 
    const {value, name} = event.target
    setAlbumForm(prevNote => ({
        ...prevNote, [name]: value})
    )}



    return (

      <div>
        <div className="spacerXXL">
              
              </div>
      {feedback? (
        <div class="alert alert-dark" role="alert">
        feedback
      </div>
      ):null}
      
              <div className="d-flex py-5 home-img-container justify-content-center "  >
            
            {input?(
              <div id="inputForm" className="position-absolute text-center col-12 col-sm-8 col-xl-6" style={{backgroundColor:"white",padding:'25px 50px',borderRadius:"25px",width:"100%",zIndex:"100"}}>
                <h3 className="my-2">
                  {inputType == "New"? "New" :  "Update"} Album</h3>
              
                <form  encType="multipart/form-data">

                {feedback? (
                  <h5>{feedback}</h5>
                ):null}
            

                <div className="input-container my-2">
                    
                    <input onChange={handleChange} type='text' text={albumForm.title} name="title"   className="p-2"  required placeholder="Title" value={albumForm.title} />
                    {/* {renderErrorMessage("title")} */}
                </div>
                


                <div className="input-container my-2">
                    
                    <textarea onChange={handleChange}   type="text" name="seo"  text={albumForm.seo}  className="p-2"   required placeholder="Seo" value={albumForm.seo}>
                    
                    </textarea>
                    {/* {renderErrorMessage("pass")} */}
                </div> 
               <div className="input-container py-3 custom-file">
                <input id="customFile"  required  name="picture"  className="custom-file-input my-2" accept="image/*" type="file" onChange={handleAlbumPicture}/>
                <label class="custom-file-label"   for="customFile">Choose album photo</label>

            </div>

           
            {inputType == "New"? (<div className="input-container py-3 custom-file">
                <input id="customFile" required multiple  name="picture"  className="custom-file-input my-2" accept="image/*" type="file" onChange={handleFileInput}/>
                <label class="custom-file-label" for="customFile">Choose photos</label>

            </div> ): null}


           <div className="row d-flex justify-content-around ">

         
                {inputType =="New"?(
                  <button onClick={submitForm}  className="btn btn-large btn-success w-100 my-2 col-3" style={{borderRadius:'50px'}}>
                  Submit
                </button>

                ):(
                <button onClick={updateAlbum} className="btn btn-large btn-success w-100 my-2 col-3" style={{borderRadius:'50px'}}>
                  Update
                </button>
                )}
               
               {inputType =="New"?(
                  null
                ):(
                <button onClick={deleteAlbum} className="btn btn-large btn-danger w-100 my-2 col-3" style={{borderRadius:'50px'}}>
                  Delete
                </button>
                )}


                <button onClick={() => setInput(false)} className="btn btn-large btn-info w-100 my-2 col-3" style={{borderRadius:'50px'}}>
                  Close
                </button>
               
                </div>
                </form>

              </div>

            ):null}


            <div className="text-center w-100" id=''>
                <div className="d-flex justify-content-end pb-5" style={{zIndex:2}}>
                

                <button onClick={() => {setAlbumForm({title:"",seo:"",category_id:""});setInputType("New");setInput(true);}} id='btn-new' className="btn btn-success mx-2">+</button>
  
                </div>
                <div className="gallery-grid ">

      
                {(typeof data.files === 'undefined') ? (
                      <p>Loading...</p>
                    ) : (
                      data.files.map((file,i)=> (

                      

                        <div>

                        
                        <Link to="./../photos">
                        
                        <div className=" w-100   p-2 text-center album" onClick={() => (localStorage.setItem("Album", file.id))} >
                        <img alt={file.seo} className="img-fluid"src={file.path} ></img>
                        <h3>{file.title}</h3> 
                        </div>
                        </Link>
                        <div className="w-100">
                        <button  className="btn btn-large" onClick={() =>{setInput(true);setAlbumID(file.id);setInputType("Update");setAlbumForm({title:file.title,seo:file.seo,category_id:file.category_id})} }>Edit</button>
                       
                        </div>
                        

                        </div>



                     
                     
                      ))


                    )}


</div>
            
            
            </div>
            </div>
      </div>
     
    );
  
};
export default AdminAlbums;