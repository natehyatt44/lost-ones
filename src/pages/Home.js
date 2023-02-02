import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
const { Zoom } = require("react-awesome-reveal");

function Home() {
    
  return (
   <> 
   
   <Navigation />
   <Zoom>
   <section id="banner " className="banner_sec "></section>
   <section id="about" className="info_sec ">
      <div className="container  barb_sec">
         <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
               <h1 className="h1_heading set_font">Barbarian Inc </h1>
               <p className="para_p  ">
                  We are Bussin fr fr
               </p>
            </div>
         </div>
      </div>
   </section>
   </Zoom>
   <Footer />
	</>
  );
}

export default Home;
