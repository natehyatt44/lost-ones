import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
const { Zoom } = require("react-awesome-reveal");

function Lore() {
    
  return (
   <> 
   <Navigation />
   <Zoom>
   <section id="banner " className="lore_sec "></section>
   </Zoom>
   <Footer />
	</>
  );
}

export default Lore;
