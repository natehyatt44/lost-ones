import React, {useState} from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ConnectWallet from '../components/ConnectWallet';
import { pairHashPack, authenticateUser } from '../components/Wallet';
const { Slide } = require("react-awesome-reveal");



function Play() {
  const [pairingString, setPairingString] = useState('')
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
    <button onClick={authenticateUser}>Authenticate</button>
    <button onClick={async () => {
      const saveData = await pairHashPack()
      setPairingString(saveData.pairingString)
    }}>BING DIDDLY</button>

   </div>
   </section>
   </Slide>
   <Footer />
	</>
  );
};

export default Play;
