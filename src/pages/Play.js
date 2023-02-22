import React, {useState} from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ConnectWallet from '../components/CallLambda';
import { pairHashPack, NFTImages } from '../components/ConnectWallet';
import Hashpack from '../modals/Hashpack';
const { Slide } = require("react-awesome-reveal");




function Play() {
  const [pairingString, setPairingString] = useState('')
  const [accountId, setAccountId] = useState('')
  const [nfts, setNfts] = useState('')
  return (
    
   <> 
   
   <Navigation />
   <section id="Play " className="info_sec ">
   <Slide>
    <div className="row">
      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center wallet-item">
        <Hashpack/>
      </div>
    </div>
   </Slide>
   </section>

	</>
  );
};

export default Play;
