import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

function Roadmap() {
    
  return (
   <> 
   <Navigation />
   <section id="faq " className="info_sec ">
      <div id="faq" className="container-fluid ">
         <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 text-center p-0">
               <h1 className="h1_heading set_font"> Roadmap</h1>
            </div>
         </div>
      </div>
   </section>
   <Footer />
	</>
  );
}

export default Roadmap;
