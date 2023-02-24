import React, { useEffect, useState } from "react";

import axios from "axios";
import { DispatchFeedbackContexts } from "../App";
function Adminphotos(props) {
  const [photo_id, setPhotoID] = useState(null);
  const [input, setInput] = useState(false);
  const [data, setData] = useState([{}]);
  const [inputType, setInputType] = useState("New");
  const [photoPicture, setPhotoPicture] = useState(null);
  const [albums, setAlbums] = useState([{}]);
  const [album, setAlbum] = useState(localStorage.getItem("Album"));
  const [selectedFile, setSelectedFile] = useState([]);
  const [acceptedFiles,setAcceptedFiles] = useState([]);
  const dispatch = DispatchFeedbackContexts();
  const [inputDisabled,setInputDisabled]=useState(false)
  const [loading,setLoading] = useState(false)
  var counterPics = 0;

  function increaseCounter() {
    counterPics = counterPics + 1;
  }
  function resetCounter() {
    counterPics = 0;
  }
  const [photoForm, setPhotoForm] = useState({
    album_id: "",
  });



  const getAllPhotos = async (e) => {

    try{
      let res = await axios.get("/photo")
      setData(res.data)
    } catch(err){
      console.log(err)

    }
   
  };

  const getAllAlbums = async (e) => {

    try{
      let res = await axios.get("/albums")
      setAlbums(res.data);
    } catch(err){
      console.log(err)

    }
   
  };


  const handleFileInput = (e) => {
    // handle validations
    e.preventDefault();
    setInputDisabled(false)
    setAcceptedFiles([])
    const files = e.target.files;
    var outputFiles = []
    Array.from(files).forEach(file => {

      if(file.size > 50000){
        setInputDisabled(true)
        dispatch({
          value: true,
          message: "File size limit is 50 kB",
          type: "Error",
        });
      } else{
        outputFiles.push(file)
      }
    });

    console.log({AcceptedFiles:outputFiles})
    setAcceptedFiles(outputFiles)
  
    setSelectedFile(files);
    console.log({filesFromLog:files});
  };
  useEffect(() => {
    getAllPhotos();
    getAllAlbums();
  }, []);

  

  const submitForm = async (event) => {
    event.preventDefault();
    // event.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < acceptedFiles.length; i++) {
      formData.append("file", acceptedFiles[i]);
    }
    formData.append("album", album);
    try{
      setLoading(true)
        let res = await axios.post("/photo/", formData, {headers: {"Content-Type": "application/json"}})
        dispatch({
                
          message: "Success! New photo/s added",
          type: "Success",
        });
        setData(res.data)
        setLoading(false)
        setSelectedFile([]);
        setAcceptedFiles([])
        setInput(false)
    } catch(err){
      console.log(err);
      dispatch({
        
        message: "Error while uploading the file",
        type: "Error",
      });
    }
    
  };

  const updatephoto = async (event) => {
    const formData = new FormData();
    formData.append("photo", photoPicture);
    formData.append("album", album);
    formData.append("photo_id", photo_id);
    setLoading(true)
    await axios
      .put("/photo/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(async (res) => {
        console.log(res);
        await getAllPhotos();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("File Upload Error");
        console.log(err);
      });
  };
  const deletephoto = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("photo_id", photo_id);
    setLoading(true)
    axios
      .post("/delete_photo/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        setLoading(false)
      })
      .catch((err) => alert("File Upload Error"));
    setInput(false);
    window.location.reload(false);
  };




  return (
    <div className="gallery-pics" id="main-external">
      {loading && (
 <div className="loading-screen">
 <div>
 <h1>
 Give me a moment! I'm processing your request</h1>
 <div class="loader"></div>
 </div>
 
</div>
      )}
     
      <div className="spacerXXL"></div>

      <div className="d-flex py-5 home-img-container justify-content-center min-height">
        {input ? (
          <div id="inputForm" className=" text-center col-12 col-sm-8 col-xl-6">
            <h3 className="my-2">
              {inputType == "New" ? "New" : "Update"} Photo
            </h3>

            <form encType="multipart/form-data ">
              <div className="input-container my-2">
                <select
                  required
                  className="form-control"
                  name="category"
                  id="albums"
                >
                  <option value="" selected disabled hidden>
                    Choose album
                  </option>
                  {typeof albums.files === "undefined" ? (
                    <p>Loading...</p>
                  ) : (
                    albums.files.map(
                      (album, i) => (
                        console.log(photoForm.album_id),
                        (
                          <option
                            selected={
                              photoForm.album_id == album.id ? true : false
                            }
                            value={album.id}
                          >
                            {album.title}
                          </option>
                        )
                      )
                    )
                  )}
                </select>
              </div>

              <div className="input-container py-3 custom-file">
                <input
                  id="customFile"
                  required
                  multiple
                  name="picture"
                  className="custom-file-input my-2"
                  accept="image/*"
                  type="file"
                  onChange={handleFileInput}
                />
                <label class="custom-file-label" for="customFile">
                  Choose photo photo
                </label>
              </div>
              
              {Array.from(selectedFile).map((file)=>{
                return(
                  <small className={acceptedFiles.some(x=>x.name == file.name)? "filename":"filename text-red"}>
                    {file.name} ( {file.size/1000} kB)
                  </small>
                )
              })}

              <svg
                  clip-rule="evenodd"
                  onClick={() => setInput(false)}
                  fill-rule="evenodd"
                  stroke-linejoin="round"
                  stroke-miterlimit="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" />
                </svg>


              <div className="row d-flex justify-content-around">
               
              {inputType == "New" ? null : (
                  <button
                    onClick={deletephoto}
                    className="btn btn-large btn-outline-danger w-100 my-2 col-3"
                    style={{ borderRadius: "50px" }}
                  >
                    Delete
                  </button>
                )}

                {inputType == "New" ? (
                  <button
            
                    onClick={submitForm}
                    className="btn btn-large btn btn-outline-success w-100 my-2 col-3"
                    style={{ borderRadius: "50px" }}
                  >
                    Submit
                  </button>
                ) : (
                  <button
                 
                    onClick={updatephoto}
                    className="btn btn-large btn btn-outline-success w-100 my-2 col-3"
                    style={{ borderRadius: "50px" }}
                  >
                    Update
                  </button>
                )}

            
              </div>
            </form>
          </div>
        ) : null}

        <div className="text-center w-100" id="">
          <div className="d-flex justify-content-around w-100">
            <div className="row w-100 justify-content-end">
              {props.token ? (
                <div className="col-12 col-sm-2 pr-2 " style={{ zIndex: 2 }}>
                  <button
                    onClick={() => {
                      setPhotoForm({ category_id: "", album_id: "" });
                      setInput(true);
                    }}
                    className="btn btn-success"
                  >
                    +
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          <div className="gallery-grid-pics ">
            {typeof data.files === "undefined" ? (
              <p>Loading...</p>
            ) : (
              data.files.map((file, i) =>
                file.album == album || album == null
                  ? (increaseCounter(),
                    (
                      <div
                        onClick={() => {
                          setInput(true);
                          setPhotoID(file.id);
                          setInputType("Update");
                          setPhotoForm({
                            album_id: file.album,
                            category_id: "",
                          });
                        }}
                        className={file.css_class}
                      >
                        <img className="" src={file.path}></img>
                      </div>
                    ))
                  : null
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Adminphotos;
