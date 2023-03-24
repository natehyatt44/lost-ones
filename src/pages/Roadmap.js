import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

function Roadmap() {
   const [loading, setLoading] = useState(true);
   
   const handleImageLoad = () => {
      setLoading(false);
   }
    
  return (
   <> 
   <Navigation />
   <section id="Roadmap " className="info_sec ">
      <div className="container roadmap-container">
         <div className="row">
            <div className={`col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center p-0 roadmap-desktop-item ${!loading && 'loaded'}`}>
                     <img onLoad={handleImageLoad} src="assets/images/banner/Roadmap-desktop.png" alt="roadmap"></img> 
               </div>
               <div className={`col-12 col-sm-12 col-md-12 col-lg-12 text-center p-0 roadmap-mobile-item ${!loading && 'loaded'}`}>
                     <img onLoad={handleImageLoad} src="assets/images/banner/Roadmap-mobile.png" alt="roadmap"></img> 
               </div>
         </div>
      </div>
   </section>
   <section className={`footer ${!loading ? 'loaded' : 'hide'}`}>
   <Footer />
   </section>
	</>
  );
}

export default Roadmap;
