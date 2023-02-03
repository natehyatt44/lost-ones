import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

function Litepaper() {
    
  return (
   <> 
   <Navigation />
   <section id="Litepaper " className="info_sec ">
      <div id="Litepaper" className="container-fluid ">
         <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 text-left p-0">
               <h1 className="h1_heading set_font"> Litepaper </h1>
               <br/>
               <p className="para_p bolded">MISSION STATEMENT <br/> 
                  To create a community driven ecosystem of nft collections under the umbrella of BarbarianInc, 
                  which is a special and unique NFT company catering to the larger crypto space as a whole. 
                  Our main goal is to establish ourselves as a brand upon which trust and value can come to be expected. 
                  Secondary to this, but still of massive importance to the team, we hope that this attitude and outlook will catch the 
                  attention of collectors not just within Hedera, but also with collectors from many other ecosystems outside of Hedera as well, 
                  acting as a catalyst to help grow the user base of Hedera itself.

               </p>
            </div>
         </div>
      </div>
   </section>
   <Footer />
	</>
  );
}

export default Litepaper;
