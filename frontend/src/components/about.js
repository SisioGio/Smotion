import React,{useState,useEffect}  from "react";
import './../App.css';
import about_pic from './../images/about.png'
import axios from "axios";

function About(props){
    const[input,setInput]=useState(false);
    const [clientLogo, setClientLogo] = useState([]);
    const[data,setData] = useState([{}]);
    const[feedback,setFeedback] = useState(null)

 
      const handleFileSelection = (e) => {
             // handle validations
             e.preventDefault();
             const file = e.target.files;
             setClientLogo(file);
             console.log(file)
      };

      const deleteClient = (clientToDelete) =>{
            alert(clientToDelete)
            const formData = new FormData();
            formData.append("client_id",clientToDelete)
            axios.post("/delete_client/",formData, {headers:
                {
                'Content-Type':'application/json'
              },
              maxBodyLength: 10000000,
              maxContentLength: 10000000},
              )
              .then((res) => {
                console.log(res)
                fetch("/get_clients").then(
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


















      const submitForm = (event) => {
        
        event.preventDefault();
        const formData = new FormData();
        for (let i = 0; i < clientLogo.length; i++) {
            formData.append("file", clientLogo[i]);
          }
          axios
          .post("/new_client/", formData,
          {headers:
            {
            'Content-Type':'application/json'
          },
          maxBodyLength: 10000000,
          maxContentLength: 10000000},
          )
          .then((res) => {
            console.log(res)
            fetch("/get_clients").then(
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
      useEffect(() =>{

        fetch("/get_clients").then(
          res => res.json()
        ).then(
          data => {
            setData(data);
            console.log(data)
          }
        )
      },[])



    return(
        <div id="about-container">

        
      <div id='about'>
                <div>
                <h1>About me</h1>

                        {input?(
                        <div id="inputForm" className="position-absolute text-center col-12 col-sm-8 col-xl-6" style={{backgroundColor:"white",padding:'25px 50px',borderRadius:"25px",width:"100%",zIndex:"100"}}>
                        <h3 className="my-2">New client</h3>

                        <form  encType="multipart/form-data">

                        {feedback? (
                        <h5>{feedback}</h5>
                        ):null}



                        {/* Client logo */}
                        <div className="input-container py-3 custom-file">
                        <input id="customFile"  multiple required  name="picture"  className="custom-file-input my-2" accept="image/*" type="file" onChange={handleFileSelection}/>
                        <label class="custom-file-label"   for="customFile">Choose  logo</label>
                        </div>





                        <div className="row d-flex justify-content-around ">



                        <button onClick={submitForm}  className="btn btn-large btn-success w-100 my-2 col-3" style={{borderRadius:'50px'}}>
                        Submit
                        </button>

                        <button onClick={() => setInput(false)} className="btn btn-large btn-info w-100 my-2 col-3" style={{borderRadius:'50px'}}>
                        Close
                        </button>

                        </div>
                        </form>

                        </div>

                        ):null}

                        <div class="about-img">

                        <img src={about_pic} alt="" />
                        </div>
                        <p>Przede wszystkim dziękuję za odwiedzenie mojej strony 😊

                        W branży fotograficznej jestem od 11 lat. Fotograf z zamiłowania i pasji. Świetnie czuje się w reportażach, zdjęciach eventowych, biznesowych, reklamowych, fotografii backstage.

                        Jestem przekonana, że dobre zdjęcie może zmienić Twój biznes o 360 stopni, być najlepszą wizytówką zarówno Twoją jak i Twojej firmy.

                        Największą satysfakcję sprawia mi poznawanie nowych osób, bo każdy fotoreportaż to inna historia.

                        Poznajmy się i stwórzmy razem coś fajnego! 😊

                        Prywatnie miłośniczka muzyki i podróży, najlepiej z aparatem w ręku 😊

                        </p>

                </div>
               
                
      </div>
             
      <div id="clients">    
                            {props.token? (
                                <div className="clients-title">
                            
                            <button id='btn-new' className="btn btn-success mx-1" onClick={()=>setInput(true)}>+</button>
                            
                            </div>
                            ):null}
                    
             
                    <div className="clients-logos">
                    {(typeof data.files === 'undefined') ? (
                      <p>Loading...</p>
                    ) : (
                      data.files.map((file,i)=> (
                        <div>
                            <img src={file.path} alt="" />
                            {props.token? (
                                <button  type='button' onClick={()=> deleteClient(file.id)} className="btn btn-danger">Delete</button>
                            ):null}
                            
                        </div>
                            
                      )))}
                        
                        
                    </div>
            
            </div>  
           


         </div>

    )
}
export default About;