import React, {useState} from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ConnectWallet from '../components/CallLambda';
import { pairHashPack, NFTImages } from '../components/ConnectWallet';
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
        <button onClick={async () => {
            const saveData = await pairHashPack()
            setPairingString(saveData.initData.pairingString)
            setAccountId(saveData.accountId)
            setNfts(saveData.nfts)
          }}>Connect Wallet</button>

          {
            pairingString &&
            <>
              <h2>Wallet Connected!</h2>
            </>
          }
          {
            nfts &&
            <>
            <h1>Select Your Character</h1>
            <p>{nfts}</p>
            <div className='row'>
            <NFTImages></NFTImages>
            </div>
            </>
          }
      </div>
    </div>
   </Slide>
   </section>
   <Footer />
	</>
  );
};

export default Play;
