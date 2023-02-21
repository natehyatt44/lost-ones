import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ConnectWallet from '../components/ConnectWallet';
const { Slide } = require("react-awesome-reveal");



function FAQ() {
  return (
   <> 
   <Navigation />
   <Slide>
   <section id="faq " className="info_sec ">
   <ConnectWallet/>
   </section>
   </Slide>
   <Footer />
	</>
  );
};

export default FAQ;
