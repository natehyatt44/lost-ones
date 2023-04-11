import React, {useState, useEffect} from 'react';
import { Scrollbar } from 'react-scrollbars-custom';
import { useLocation } from 'react-router-dom';
import { TypeWriter } from "../animations/TypeWriter";
const { Slide, Fade } = require("react-awesome-reveal");

const chapter1 = `A NFT company dedicated to integrity, transparency, and trust as we build out an ecosystem of interconnected Digital Art Collectibles for Hedera and the greater NFT ecosystem as a whole. 
                       \nA compelling storyline filled with lore and mystery, all while driving community engagement through an Alternate Reality Game entitled:
                       \n"The Lost Ones"
                       \n\nWelcome to the club.
                       \n bilo
                       \n bilo 
                       \n bilo
                         `;


function Game(props) {
  const location = useLocation();
  const accountId = location.state.accountId;
  const selectedImage = location.state.selectedImage;

  const text = TypeWriter(chapter1);

  return (
   <> 
    <Fade duration={10000} top>
    <div className="row">
      <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-1 text-left nft-item">
        <Fade duration={15000} top>
          <p>Account Id {accountId}</p>
        </Fade>
      </div>
    </div>
    <div className="row">
      <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-1 text-left nft-item">
        <Fade duration={15000} top>
          <img src={selectedImage} alt="selected-nft" style={{ borderRadius:"50%", width:"100%", height:"100%" }} /> 
        </Fade>
      </div>
    </div>
    <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center lore-item">
            <Slide direction='down' duration={30000}><h1 className="h1_head_sml set_font"> Chapter 1 </h1></Slide>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center story-container">
            <br/>
            <Scrollbar style={{ height: 500}}>
              <pre className="para_p">
                  {text}
              </pre>
            </Scrollbar>
        </div>
      </div>
  </Fade>
	</>
  );
};

export default Game;
