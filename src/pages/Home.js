import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
const { Zoom } = require("react-awesome-reveal");

function Home() {
    
  return (
   <> 
   
   <Navigation />
   <Zoom>
   <section id="banner " className="banner_sec "></section>
   </Zoom>
   <Footer />
	</>
  );
}

export default Home;
