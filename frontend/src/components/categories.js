import React,{ useEffect, useState,useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// import FileUploader from './fileUploader'
function Categories() {
  const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));


const[category_id,setCategoryID]=useState(null)
const[input,setInput]=useState(false);
const[data,setData] = useState([{}]);
const[inputType,setInputType]=useState("New")
  const [selectedFile, setSelectedFile] = useState(null);
  const [categoryForm, setCategoryForm] = useState({
    title: "",
    text:"",
    seo:"",

  })
useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (loggedInUser) {
      setauthenticated(true);
    } else {
      setauthenticated(false);
    }
  }, []);
    const handleFileInput = (e) => {
        // handle validations
        const file = e.target.files[0];
        setSelectedFile(file)
        console.log(file)
      };

  


    
  useEffect(() =>{

    fetch("/get_categories").then(
      res => res.json()
    ).then(
      data => {
        setData(data);
        console.log(data)
      }
    )
  },[])
 
  const submitForm = (event) => {
    // event.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title",categoryForm.title)
    formData.append("text",categoryForm.text)
    formData.append("seo",categoryForm.seo)
    
      axios
      .post("/new_category/", formData,
      {headers: {
        'Content-Type':'application/json'
      }}
      )
      .then((res) => {
        console.log(res)

        
      })
      .catch((err) => alert("File Upload Error"));

    } 

    const updateCategory = (event) => {
      // event.preventDefault();
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("title",categoryForm.title)
      formData.append("text",categoryForm.text)
      formData.append("seo",categoryForm.seo)
      formData.append("id",category_id)

      alert("Updating category..." + category_id)
      axios
      .post("/update_category/", formData,
      {headers: {
        'Content-Type':'application/json'
       }}
      )
      .then((res) => {
        console.log(res)
  
        
      })
      .catch((err) => alert("File Upload Error"));
    }

    const deleteCategory = (event) => {
      // event.preventDefault();
      const formData = new FormData();

      formData.append("id",category_id)

      alert("Deleting category..." + category_id)
      axios
      .post("/delete_category/", formData,
      {headers: {
        'Content-Type':'application/json'
       }}
      )
      .then((res) => {
        console.log(res)
  
        
      })
      .catch((err) => alert("File Upload Error"));
      window.location.reload(false)
      setInput(false);
      
    }
    
  // function addCategory(event) {
      
  //   const formData = new FormData();
  //   // formData.append('title',categoryForm.title);
  //   // formData.append('text',categoryForm.text);
  //   // formData.append('seo',categoryForm.seo);
  //   console.log(categoryForm.picture)
  //   formData.append('seo',categoryForm.picture);


  //   axios({
  //     method: "POST",
  //     url:"/new_category/",
  //     data: formData,
  //     //  headers: {
  //     //   Accept: 'application/json',
  //     //   'Content-Type': 'multipart/form-data',
  //     // },
  //   })
  //   .then((response) => {
  //     console.log(response)
  //   }).catch((error) => {
  //     if (error.response) {
  //       console.log("Error during logging...")
  //       console.log(error.response)
  //       console.log(error.response.status)
  //       console.log(error.response.headers)
  //       }
  //   })


  //   event.preventDefault()
  // }

  function handleChange(event) { 
    const {value, name} = event.target
    setCategoryForm(prevNote => ({
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
                  {inputType == "New"? "New" :  "Update"} Category</h3>
              
                <form  encType="multipart/form-data">

               
                <div className="input-container my-2">
                    
                    <input onChange={handleChange} type='text' text={categoryForm.title} name="title"   className="p-2"  required placeholder="Title" value={categoryForm.title} />
                    {/* {renderErrorMessage("title")} */}
                </div>
                <div className="input-container my-2">
                    <textarea  onChange={handleChange} type="text" name="text"  text={categoryForm.text}  className="p-2"   required placeholder="Text" value={categoryForm.text}>

                    </textarea>
{/*                     
                    {renderErrorMessage("pass")} */}
                </div>


                <div className="input-container my-2">
                    
                    <textarea onChange={handleChange}   type="text" name="seo"  text={categoryForm.seo}  className="p-2"   required placeholder="Seo" value={categoryForm.seo}>
                    
                    </textarea>
                    {/* {renderErrorMessage("pass")} */}
                </div> 

           

            <div className="input-container py-3 custom-file">
                <input id="customFile"  name="picture"  className="custom-file-input my-2" accept="image/*" type="file" onChange={handleFileInput}/>
                <label class="custom-file-label" for="customFile">Choose file</label>

            </div>
                <div className="row d-flex justify-content-around">

                {inputType =="New"?(
                  <button onClick={submitForm}  className="btn btn-large btn-success w-100 my-2 col-3" style={{borderRadius:'50px'}}>
                  Submit
                </button>
                ):(
         
                 <button onClick={updateCategory} className="btn btn-large btn-success w-100 my-2 col-3 " style={{borderRadius:'50px'}}>
                  Update
                </button>
               
                )}  


                {inputType =="New"?( null ):(
                <button onClick={deleteCategory} className="btn btn-large btn-danger w-100 my-2 col-3" style={{borderRadius:'50px'}}>
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
                <div className="d-flex justify-content-end px-5 " style={{zIndex:2}}>
                {authenticated? (
                  <button onClick={() => setInput(true)}className="btn btn-success" id='btn-new'>+</button>
                ):null}

                </div>
                {(typeof data.files === 'undefined') ? (
                      <p>Loading...</p>
                    ) : (
                      data.files.map((file,i)=> (
                        

                        <div>

                      
                        <Link to="./../albums">
                    
                      <div onClick={() => (localStorage.setItem("Category", file.id))} className="row border border-light my-5 text-center" style={{backgroundColor:"rgba(255,255,255,0.4)"}}>
                        <div className="col-12 text-center ">
                          <h1>{file.title}</h1>
                         
                          
                          
                        </div>
                        

                        <div className="col-12 col-sm-4 ">

                          <img className="img-fluid" src={"http://127.0.0.1:5000/get_category_image/"+file.id} ></img>

                        </div>
                       
                        <div className="col-12 col-sm-4">
                          {file.text}
                        </div>
                        <div className="col-12 col-sm-4">
                          {file.seo}
                        </div>
                        
                  
                      </div>
                      </Link>

                      {authenticated?(
                        <div className="col-12">
 <a className=" text-center" onClick={() =>{setInput(true);setCategoryID(file.id);setInputType("Update");setCategoryForm({file:file.file,title:file.title,text:file.text,seo:file.seo})} } href="#">Edit</a>
                       
                        </div>
                      
                       ):null}                      
                      </div>



                      ))


                    )}



            
            
            </div>
            </div>
      </div>
     
    );
  
};
export default Categories;