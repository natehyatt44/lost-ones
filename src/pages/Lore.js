import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
const { Flip } = require("react-awesome-reveal");

function Lore() {
    
  return (
   <> 
   <Navigation />
   <Flip>
   <section id="banner " className="lore_sec "></section>
   </Flip>
   <Footer />
	</>
  );
}

export default Lore;
