import React from 'react';
import Navigation from '../components/Navigation';

function FAQ() {
    
  return (
   <> 
   <Navigation />
   <section id="faq " className="info_sec ">
      <div id="faq" className="container-fluid ">
         <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 text-center p-0">
               <h1 className="h1_heading set_font"> FAQ</h1>
            </div>
         </div>
      </div>
   </section>
   <Navigation />
	</>
  );
}

export default FAQ;
