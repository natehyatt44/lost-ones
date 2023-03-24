import React, {useState, useEffect} from 'react';
import Navigation from '../components/Navigation';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ConnectHashPack, ConnectHashPackExtension, AccountNFTs, NFTImages, PairHashPack } from '../components/ConnectWallet';
import { Scrollbar } from 'react-scrollbars-custom';
import { useLocation } from 'react-router-dom';
const { Slide, Fade } = require("react-awesome-reveal");

const text = [`Destroyed by their own hand, the Mortal's home planet of Earth died many eons ago. 
              Unable to work together and live in peaceful harmony with the planet they once called home, the 
              sustainability of life on earth slowly faded away. Some even surmise that an uncontrollable form 
              of AI may have contributed to the gradual progression of the tragedy, but the specifics of these 
              events are uncertain now. The sands of time have slowly eroded away much of this ancient history.`,
              `What IS known is that much interplanetary colonization occurred before this all came to pass, which 
              allowed for the technologies of the race to continue to grow and expand in a more purposeful and meaningful 
               direction. Seeming to have learned from the mistakes of their past, friendship and family are the sole cornerstone for 
              this race, with much emphasis being placed on community and peaceful coexistence. In line with this new mindset
              is also a healthy dose of ultraviolent protectionism of what they now hold most dear... each other.`, 
              `Finally, intergalactic travel was accomplished, and over time, many members of this race have elected to migrate throughout the universe.`];


function Game(props) {
  const location = useLocation();
  const accountId = location.state.accountId;
  const selectedImage = location.state.selectedImage;

  return (
   <> 
    <Fade duration={10000} top>
    <div className="row">
      <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-1 text-left nft-item">
        <Fade duration={15000} top>
          <img src={selectedImage} alt="selected-nft" style={{ borderRadius:"50%", width:"100%", height:"100%" }} /> 
        </Fade>
      </div>
    </div>
    <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center lore-item">
            <Slide direction='down' duration={30000}><h1 className="h1_head_sml set_font"> Chapter 1 {accountId} </h1></Slide>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center story-container">
            <br/>
            <Scrollbar style={{ height: 500}}>
              <Fade duration={10000}><p className="para_p">{text[0]}</p></Fade>
              <Fade duration={20000}><p className="para_p">{text[1]}</p></Fade>
              <Fade duration={30000}><p className="para_p">{text[2]}</p></Fade>
              <Fade duration={10000}><p className="para_p">{text[0]}</p></Fade>
              <Fade duration={20000}><p className="para_p">{text[1]}</p></Fade>
              <Fade duration={30000}><p className="para_p">{text[2]}</p></Fade>
            </Scrollbar>
        </div>
      </div>
  </Fade>
	</>
  );
};

export default Game;
