import React from 'react';
import Navigation from '../components/Navigation';

function Home() {
    
  return (
   <> 
   
   <Navigation />
   
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

   <Navigation />
	</>
  );
}

export default Home;
