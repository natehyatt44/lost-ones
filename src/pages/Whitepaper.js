import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
const { Fade } = require("react-awesome-reveal");

function Whitepaper() {
    
  return (
   <> 
   <Navigation />
   <section id="Whitepaper " className="info_sec ">
      <Fade duration={3000}>
      <div id="Whitepaper" className="container-fluid ">
         <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 text-center p-0">
            <br/> <br/>  <h1 className="h1_heading set_font"> Whitepaper </h1>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 text-center p-0">
               <br/>
               <h1 className="h1_head_sml set_font"> Mission Statement </h1> 
               <p className="para_p  ">
                  To create a community-driven ecosystem of Digital Collectibles under the umbrella of the HBARBARIANS LLC, which is a special and unique company catering to the larger web 2 and web 3 space as a whole. Our main goal is to establish ourselves as a brand upon which trust and value can come to be expected. Secondary to this, but still of massive importance to the team, we hope that this attitude and outlook will catch the attention of collectors not just within Hedera, but also with collectors from many other ecosystems outside of Hedera as well, acting as a catalyst to help grow the user base of Hedera itself.
                  <br/><br/>
                  </p>
                  <h1 className="h1_head_sml set_font"> The Problem as we see it </h1> 
                  <p className="para_p">
                  Abuse of the term “Community Founders Passes”, a lack of transparency surrounding what is being built and/or worked on, the absence of a fully doxed team, and an overall lack of depth and utility surrounding certain collections are all issues that are not unique to the Hedera Digital Collectables space. In fact, it could be argued that these problems are far more common within other Digital Collectables ecosystems outside of Hedera, however, they are still very much present to a certain extent on our own home turf.
                  <br/><br/>
                  </p>
                  <h1 className="h1_head_sml set_font"> The Solution as we see it </h1> 
                  <p className="para_p">
                  Provide outstanding real-world utility to all our collections. Anything released under the umbrella of HBARBARIANS LLC will have its own unique purpose and place within our ecosystem. Everything we build will be of the highest quality in terms of art, with extreme attention to detail being paid at every turn. Finally, dispelling the unfavorable views people have in regard to Community Founders Passes will be accomplished through tethering maximum functionality to our own CFPs, while simultaneously providing fully transparent and ongoing updates as new use cases arise for these.
                  <br/><br/>
                  </p>
                  <h1 className="h1_head_sml set_font"> Value Prop for the collections within the HBARBARIANS LLC Ecosystem </h1> 
                  <p className="para_p">
                  At HBARBARIANS we aim to build value from the ground up, one collection at a time. By coupling timeless art and a plethora of announced holder benefits in conjunction with the release of our “Hbarbarians” Community Founders Passes, this will very much set the stage for what comes next, our Alternate Reality Game (ARG). We will then launch and roll out our 5 subsequent Digital Collectables collections associate with our ARG, which will offer a thrilling and rewarding experience for the community. Proceeding from this point, it starts to become clear that expectations surrounding quality and value in anything relating to HBARBARIANS LLC will be running at all-time highs. This will benefit holders most, as the perceived value of anything pertaining to our Digital Collectables ecosystem will also be running at all-time highs. Keeping up and maintaining this momentum will be our utmost priority. It is in this way that we will build and maintain value within our company, through actually delivering.
                  <br/><br/>
                  </p>
                  <h1 className="h1_head_sml set_font"> Funding </h1> 
                  <p className="para_p">
                  Here at HBARBARIANS, we are fostering an attitude of “If you build it, they will come”. Every mint we hold will have 20% (post launchpad fees, of course) placed into a company treasury to help fund all company-related needs and sub-contract work, and to build up the underlying valuation of HBARBARIANS LLC as a whole. We also plan on approaching VCs for funding once we have proven ourselves through the successful launch of the “Hbarbarians” Community Founders Passes and our ARG “The Lost Ones”. Are we hinging a lot on the hope that our future VC funding round is a success? Yes. It is best, to be honest about this and not try to play games. However, we genuinely believe that we can and will receive said funding as long as we do our jobs in delivering what we have promised with the CFPs and ARG.
                  <br/><br/><br/>
                   {/*</p>
                  <h1 className="h1_head_sml set_font"> Meet The Team </h1> 
                  <p className="para_p">
                  <br/>Alixon Viloria aka <a href="https://twitter.com/alixonjviloria">@alixonjviloria</a> <br/>
                  Artist & Creative Director <br/>
                  With 10 years of experience in drawing, illustration, and visual storytelling, he is creative without limits and a lover of all things art. You don’t have to look for very long in order to see this type of attitude exuding from all of his work. He goes wholehearted. <br/><br/>
                  <br/>Nate Hyatt aka <a href="https://twitter.com/nbreezay_hbar">@nbreezay_hbar</a> <br/>
                  Developer <br/>
                  Lives for soccer, football, rock climbing, and snowboarding. He has nearly 15 years of data engineering/cloud architect experience primarily at startups. Dipped his toes into web3 dev, and fell in love with developing against the hedera network. Although newer to the Digital Collectables scene, he is really enjoying the space and the community aspect it has to offer. Most importantly, he has been in $hbar since 57 cents and hasn’t lost a single ounce of belief. kek <br/><br/>
                  <br/>Justin Bratt aka <a href="https://twitter.com/jmjustinmyers">@jmjustinmyers</a> <br/>
                  Founder / CEO <br/>
                  A passionate crypto enthusiast since January 2018, Justin is not afraid to dream and test the boundaries of what is possible. A strong work ethic, coupled with manifestation is his go-to combination. Bet against him at your own risk. 
                  */}
               </p>
            </div>
         </div>
      </div>
      </Fade>
   </section>
   <Footer />
	</>
  );
}

export default Whitepaper;
