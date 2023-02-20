

function Footer() {


    return(
        <footer className='mt-5 w-100'>
        <div id='footer' className="row d-flex justify-content-center px-2 mx-1 border-top border-black pt-2 position-relative" style={{backgroundColor: "rgba(255, 255, 255, .9)"}}>
 
 <div className="col-12  col-sm-6 text-dark ">
   <div className="row py-1">

     <div className="col-12  py-1 text-center">
       <p>Smotion Phography <br/>Warszawa, Zawiszy 12 01-167 <br/> Smotion.photography@smotion.pl</p>
     </div>
     <div className="col-12 ">
       <div class="row d-flex justify-content-between">
         <span style={{fontSize:"2rem"}} className='px-2'>
           <a href="https://www.facebook.com/profile.php?id=100076573800194" id='facebook'><i className="fab fa-facebook"></i></a>
         </span>
         <span style={{fontSize:"2rem"}} className='px-2'>
           <a href="https://www.instagram.com/smotion_photo/?hl=en"><i id='insta' className="fab fa-instagram"></i></a>
         </span>
         <span style={{fontSize:"2rem"}} className='px-2'>
           <a href="tel:+48 791653253"><i className="fas fa-phone" style={{color:"#343a40!important"}}></i></a>
         </span>
        
       </div>
     </div>


    
   </div>


   
 
 </div>
</div>

</footer>
    )
}

export default Footer;