import React from 'react';
import Navigation from '../components/Navigation';

function Team() {
    
  return (
   <> 
   <Navigation />
   <section id="team " className="info_sec ">
   <div id="team" className="container  barb_sec">
      <div className="row">
         <div className="col-sm-12 col-md-12 col-lg-10">
            <h1 className="h1_heading set_font"> Team</h1>
         </div>
         <div className="col-sm-12 col-md-12 col-lg-2"> 
            <img className="image_dev" src="assets/images/team/nbreezay.png" />
         </div>
         <div className="row">
         <p className="desc_dev">
               nbreezay - dev
            </p>
         </div>
      </div>
   </div>
   </section>
   <Navigation />
	</>
  );
}

export default Team;
