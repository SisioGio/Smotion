import {useState} from 'react'
import axios from "axios";
function Contact() {
    const [contactForm, setContactForm] = useState({
        name:"",
        surname:"",
        phone:"",
        email: "",
        text: ""
      })

    function send_email(event) {
      window.open('mailto:Smotion.photography@smotion.pl')
    }

const Mailto = ({ email, subject, body, children }) => {
  return (
    <a class="btn btn-black w-100 draw meet border-dark text-dark" type='button' href={`mailto:${email}?subject=${encodeURIComponent(subject) || ''}&body=${encodeURIComponent(body) || ''}`}>Submit</a>
  );
};
        
      

      function handleChange(event) { 
        console.log(event.target.value)
        const {value, name} = event.target
        setContactForm(prevNote => ({
            ...prevNote, [name]: value})
        )}

    return(
        <div class="main-container w-100  p-sm-2 p-md-2 pt-4 pt-md-4 py-2 bg-light " id="contact">
        <div class="row  d-flex justify-content-center px-2 mx-1">
            <div class="col-12 col-sm-8 col-lg-6 col-xl-6 ">
    
             
              <div class="text-center  text-dark" id='contact-us-title'>
                <h3>Let's get in contact!</h3>
              </div>
              <form class='' enctype="multipart/form-data" method="POST" >
                
                  <div class="form-row ">
                    <div class="col form-group">
                        <input name='name' onChange={handleChange} type={contactForm.name} text={contactForm.name}   required  value={contactForm.name} className="form-input-email w-100"  placeholder='Name'/>
                     
                    </div>
    
                    <div class="col form-group">
                    <input name='surname' onChange={handleChange} type={contactForm.surname} text={contactForm.surname}   required  value={contactForm.surname} className="form-input-email w-100" placeholder='Surname'/>
                      
                    </div>
                  </div>
    
                <div class="form-row">
                  <div class="col form-group">
                  <input name= 'email' className="form-input-email w-100" onChange={handleChange} type='email' text={contactForm.email}   required  value={contactForm.email} placeholder='Email'></input>
                      
                </div>
    
                <div class="col form-group">
                
                   <input name='phone' type='tel' className="form-input-email w-100" onChange={handleChange}  text={contactForm.phone}   required  value={contactForm.phone} placeholder='Phone Number'></input>
                      
                </div>
                </div>
                <div class="form-group my-2">
                <input name='text' className="form-control w-100 form-input-email" id='text-form' onChange={handleChange} type={contactForm.text} text={contactForm.text}   required  value={contactForm.text} placeholder='Type your message here...'></input>
                     
                </div>
                <Mailto email={contactForm.email} subject={"Good news! " +contactForm.name + " would like to talk with you!"} body={contactForm.text}/>
                {/* <button onClick={send_email} type="button" class="btn btn-black w-100 draw meet border-dark text-dark">Submit</button> */}
              </form>
            </div>
        </div>
    
    
      </div>
    )
}

export default Contact;