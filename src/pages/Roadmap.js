import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const { Fade } = require("react-awesome-reveal");


function Roadmap() {
  return (
   <> 
   <Navigation />
    <Fade duration={3000}>
    <section id="Roadmap " className="info_sec "> 
       <div className='roadmap-container '>
            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center p-0 roadmap-desktop-item'>
                     <img src="assets/images/banner/barb-Roadmap-mobile.png" alt="roadmap"></img> 
               </div>
               <div className='col-12 col-sm-12 col-md-12 col-lg-12 text-center p-0 roadmap-mobile-item'>
                     <img src="assets/images/banner/barb-Roadmap-mobile.png" alt="roadmap"></img> 
               </div>
      </div>
  </section> 
    </Fade>
   <section className={`footer`}>
  <Footer />
  </section>
   
	</>
  );
}

export default Roadmap;