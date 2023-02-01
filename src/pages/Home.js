
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
<section id="gallery " className="info_sec ">
   <div id="gallery" className="container  barb_sec">
      <div className="row">
         <div className="col-sm-12 col-md-12 col-lg-10">
            <h1 className="h1_heading set_font"> Gallery</h1>
            <div className="col-sm-12 col-md-12 col-lg-10"><img className="gallery_img" src="assets/images/gallery/8.png"/></div>
         </div>
         
      </div>
   </div>
</section>
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
<section id="map " className="info_sec ">
   <div id="roadmap" className="container-fluid ">
      <div className="row">
         <div className="col-sm-12 col-md-12 col-lg-12 text-center p-0">
            <h1 className="h1_heading set_font"> Roadmap</h1>
         </div>
      </div>
      <div className="row">
      </div>
   </div>
</section>
<section id="faq " className="info_sec ">
   <div id="faq" className="container-fluid ">
      <div className="row">
         <div className="col-sm-12 col-md-12 col-lg-12 text-center p-0">
            <h1 className="h1_heading set_font"> FAQ</h1>
         </div>
      </div>
   </div>
</section>
<footer>
   <section id="footer " className="footer_sec ">
      <div className="container-fluid ">
         <div className="row icons_footer">
            <div className="col-sm-12 text-left">
               <a className="navbar-brand navbar-footer" href="/"><img className="logo_s" src="assets/images/logo.png"/></a>                 
            </div>
            <div className="col-sm-12 text-right">
               <span className="navbar-text" >
               <a href="https://twitter.com/BarbarianInc" target={{target:"_blank"}}>
               <img className="seicon" src="assets/images/icon/icon_twitter.svg"/>
               </a>
               <a href="https://twitter.com/BarbarianInc" target={{target:"_blank"}}>
               <img className="seicon" src="assets/images/icon/icon_discord.svg"/>
               </a>
               </span>
            </div>
         </div>
      </div>
   </section>
</footer>
	</>
  );
}

export default Home;
