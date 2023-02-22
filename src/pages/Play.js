import React, {useState} from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ConnectWallet from '../components/ConnectWallet';
import { pairHashPack } from '../components/Wallet';
import { AccountNFTs } from '../components/AccountNFTs';
const { Slide } = require("react-awesome-reveal");



function Play() {
  const [pairingString, setPairingString] = useState('')
  const [nfts, setnfts] = useState('')
  return (
   <> 
   <Navigation />
   <Slide>
   <section id="Play " className="info_sec ">
   <ConnectWallet/>
   <div>
    {
      pairingString &&
      <>
        <h1>Pairing String</h1>
        <h2>{pairingString}</h2>
      </>
    }
    {
      nfts &&
      <>
        <h1>NFT List</h1>
        <h2>{nfts}</h2>
      </>
    }
    <button onClick={async () => {
      const nfts = await AccountNFTs()
      setnfts(nfts)
    }}>Get Account NFTS</button>
    <button onClick={async () => {
      const saveData = await pairHashPack()
      setPairingString(saveData.pairingString)
    }}>Connect Wallet</button>
    
   </div>
   </section>
   </Slide>
   <Footer />
	</>
  );
};

export default Play;
