import React,{ useEffect, useState,useRef } from "react";

import axios from "axios";

function Adminphotos() {
const[photo_id,setPhotoID]=useState(null)
const[input,setInput]=useState(false);
const[data,setData] = useState([{}]);
const[inputType,setInputType]=useState("New")
const [photoPicture, setPhotoPicture] = useState(null);
const[category,setCategory] = useState(null);
const[categories,setCategories] = useState([{}]);
const[albums,setAlbums] = useState([{}]);
const[album,setAlbum] = useState(localStorage.getItem("Album"))
const[filter_album,setFilterAlbums] = useState([{}])
const[filterCategory,setFilterCategory] = useState(null)
const[filteredPhotos,setFilteredPhotos] = useState([{}])
const [selectedFile, setSelectedFile] = useState([]);
var counterPics  = 0

function increaseCounter (){
  counterPics = counterPics +1
}
function resetCounter (){
  counterPics = 0
}
  const [photoForm, setPhotoForm] = useState({
    album_id :""
  })

      const resetFilter = () =>{
        localStorage.setItem("Album",null)
        setAlbum(null)


      }

      const handlephotoPicture = (e) => {
        // handle validations
        const file = e.target.files[0];
        setPhotoPicture(file)
      

      };

  const getAllPhotos =(e) => {
    
    fetch("/get_photos/").then(
      res => res.json()
    ).then(
      data => {
        console.log(data)
        setData(data);
        
        
      }
    )
  }
  const handleFileInput = (e) => {
    // handle validations
    e.preventDefault();
    const file = e.target.files;
    setSelectedFile(file);
    console.log(file)
    
  };
  useEffect(() =>{
    getAllPhotos();
  },[])
  
  useEffect(() =>{

    fetch("/get_albums").then(
      res => res.json()
    ).then(
      data => {
        setAlbums(data);
      }
    )

  },[])

  const submitForm = (event) => {
    // event.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < selectedFile.length; i++) {
      formData.append("file", selectedFile[i]);
    }
    formData.append("album",album)
      axios
      .post("/new_photo/", formData,
      {headers:
        {
        'Content-Type':'application/json'
      }}
      )
      .then((res) => {
        console.log(res)
      })
      .catch((err) => alert("File Upload Error"));
    } 

    const updatephoto = (event) => {
    alert(photo_id)
    alert(album)
    const formData = new FormData();
    formData.append("photo",photoPicture)
    formData.append("album",album)
    formData.append("photo_id",photo_id)
      axios
      .post("/update_photo/", formData,
      {headers:
        {
        'Content-Type':'application/json'
      }}
      )
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {alert("File Upload Error")
      console.log(err)
    });
    }
    const deletephoto = (event) => {
        const formData = new FormData();
    formData.append("photo_id",photo_id)
      axios
      .post("/delete_photo/", formData,
      {headers:
        
        {
        'Content-Type':'application/json'
      }}
      )
      .then((res) => {
        console.log(res)

        
      })
      .catch((err) => alert("File Upload Error"));
      setInput(false)
      window.location.reload(false)
    }
    
    const handleCategoryFilter =(event) =>{
        setFilterCategory(event.target.value);
        
    }
  function handleChange(event) { 
    const {value, name} = event.target
    setPhotoForm(prevNote => ({
        ...prevNote, [name]: value})
    )}



    return (

      <div>
        <div className="spacerXXL">
             
              </div>
            
              


            



              <div className="d-flex py-5 home-img-container justify-content-center height-100vh"  >
            
            {input?(
              <div id="inputForm" className="position-absolute text-center col-12 col-sm-8 col-xl-6" style={{backgroundColor:"white",padding:'25px 50px',borderRadius:"25px",width:"100%",zIndex:"100"}}>
                <h3 className="my-2">
                  {inputType == "New"? "New" :  "Update"} Photo</h3>
              
                <form  encType="multipart/form-data " >

              


                <div className="input-container my-2">
                <select required   className="form-control" name="category" id="albums">
                
                <option value="" selected disabled hidden>Choose album</option>
                {(typeof albums.files === 'undefined') ? (
                      <p>Loading...</p>
                    ) : (
                        albums.files.map((album,i)=> (
                          console.log(photoForm.album_id),
                        <option selected={photoForm.album_id==album.id? true:false} value={album.id}>{album.title}</option>         

                      )))}


              
                </select>

                   
                </div>

            
               <div className="input-container py-3 custom-file">
                <input id="customFile"  required multiple name="picture"  className="custom-file-input my-2" accept="image/*" type="file" onChange={handleFileInput} />
                <label class="custom-file-label" for="customFile">Choose photo photo</label>

            </div>



           
                <div className="row d-flex justify-content-around">


               
                {inputType =="New"?(
                  <button onClick={submitForm}  className="btn btn-large btn-success w-100 my-2 col-3" style={{borderRadius:'50px'}}>
                  Submit
                </button>
                ):(

                <button onClick={updatephoto} className="btn btn-large btn-success w-100 my-2 col-3" style={{borderRadius:'50px'}}>
                  Update
                </button>
            
                )}
               
               {inputType =="New"?(
                  null
                ):(
                <button onClick={deletephoto} className="btn btn-large btn-danger w-100 my-2 col-3" style={{borderRadius:'50px'}}>
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
                <div className="d-flex justify-content-around w-100">
                <div className="row w-100 justify-content-end">

                    {/* <div className="col-12 col-sm-2 px-2">
                    <select mandatory  onChange={handleCategorySelection}  className="dropDown" name="category" id="categories_filter">
                        
                        <option value="" selected={filterCategory ? false:true}  disabled >Choose Category</option>
                        {(typeof categories.files === 'undefined') ? (
                              <p>Loading...</p>
                            ) : (
                              categories.files.map((cat,i)=> (
                                
                                <option value={cat.id}>{cat.title}</option>         

                              )))}
                        </select>         
                        </div>

                        <div className="col-12 col-sm-2 px-2">
                        <select mandatory  onChange={handleAlbumFilterSelection}  className="dropDown" name="album" id="albums_filter">
                        
                        <option value="" selected={filterCategory ? false:true} disabled >Choose album</option>
           
                        {(typeof albums.files === 'undefined') ? (
                              <p>Loading...</p>
                            ) : (
                              albums.files.map((album,i)=> (
                                
                                <option  hidden={filterCategory==album.category_id? false:true} value={album.id}>{album.title} || {album.category_id}</option>         

                              )))}
                        </select> 
                        </div> */}
                        <div className="col-12 col-sm-2 pr-2 " style={{zIndex:2}}>
                        <button onClick={() => {setPhotoForm({category_id:"",album_id:""});setInput(true);}}className="btn btn-success">+</button>
                        <a href="#" className="px-5" onClick={() => resetFilter()}>View All</a>
                        </div>
   

    </div>

               

                </div>

                <div className="gallery-grid ">

               
                {(typeof data.files === 'undefined') ? (
                      <p>Loading...</p>
                    ) : (

                      

                      data.files.map((file,i)=> (
                        
                        (file.album == album || album == null) ? (
                          increaseCounter(),
                        
                          <div onClick={() =>{setInput(true);setPhotoID(file.id);setInputType("Update");setPhotoForm({album_id:file.album,category_id:""})} }  className={file.css_class}>
                            <img className=""src={"http://127.0.0.1:5000/get_picture/"+file.id} ></img>

                           
                        </div>
                        ):null

                      
                      ))


                    )}

</div>

            
            
            </div>
            </div>
      </div>
     
    );
  
};
export default Adminphotos;