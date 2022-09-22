import React,{useState}  from "react";
import './../App.css';
import about_pic from './../images/about.png'
function About(){
    
    return(
      <div id='about'>
                
                <h1>About me</h1>



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


          // <div id='about'>
            
           

          //     <div className="child">
          //     <img src={about_pic} alt="" />
          //     </div>
          //     <div className="child">
          //     <p>
          //   Przede wszystkim dziękuję za odwiedzenie mojej strony :)

          //   W branży fotograficznej jestem od 11 lat. Fotograf z zamiłowania i pasji. Świetnie czuje się w reportażach, zdjęciach eventowych, biznesowych, reklamowych, fotografii backstage.

          //   Jestem przekonana, że dobre zdjęcie może zmienić Twój biznes o 360 stopni, być najlepszą wizytówką zarówno Twoją jak i Twojej firmy.

          //   Największą satysfakcję sprawia mi poznawanie nowych osób, bo każdy fotoreportaż to inna historia.

          //   Poznajmy się i stwórzmy razem coś fajnego! :)

          //   Prywatnie miłośniczka muzyki i podróży, najlepiej z aparatem w ręku :)
          //   </p>
          //       </div>
            
            

          //   </div>
            
         

    )
}
export default About;