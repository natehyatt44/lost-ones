import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Spin from 'react-reveal/Spin';



function Lore() {
    
  return (
   <> 
   <Navigation />
   <Spin>
   <section id="banner " className="lore_sec "></section>
   </Spin>
   <Footer />
	</>
  );
}

export default Lore;
