import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Hashpack from '../modals/Hashpack';
import { NFTImages } from '../components/ConnectWallet';
const { Slide, Fade } = require("react-awesome-reveal");

const regex = /^0\.0\..*/;

function Play() {
  const [accountId, setAccountId] = useState('')
  const [nfts, setNfts] = useState([])
  const [showBarbarians, setShowBarbarians] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  function handleRaceButtonClick() {
    setShowBarbarians(true);
  }

  function handleStartGame(index) {
    setSelectedImage(index)
    navigate('/game', {state:{selectedImage: index, accountId: accountId}});
  }

  const handleHashpackConnect = (accountId, nfts) => {
    setAccountId(accountId);
    setNfts(nfts);
  };

  return (
   <> 
   <Navigation />
   <section id="Play " className="info_sec ">
   <div className="nft-container ">
   {!regex.test(accountId) &&
   <>
    {/* <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center p-0 prologue-item">
          <Hashpack onConnect={handleHashpackConnect} />
        </div>
    </div> */}
    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center wallet-fail">
      <Fade duration={5000}>
      <h1 className="h1_heading set_font">Coming soon...</h1>
      </Fade>
    </div>
  </>
  }
    {regex.test(accountId) && nfts.length > 0 &&( 
      <>
        <Slide direction='right' duration={1500}>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center nft-item">
            <h2 className="h1_head_m set_font">Select Race</h2>
          </div>
        </Slide>
        <Slide direction='left' duration={1500}>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center btn-list">
            <button type="button" variant="dark" className="btn btn-primary active futuristic-btn" onClick={handleRaceButtonClick}>Mortal</button>
            <button type="button" className="btn btn-secondary disabled futuristic-btn">Alluvial</button>
            <button type="button" className="btn btn-secondary disabled futuristic-btn">Elven</button>
            <button type="button" className="btn btn-secondary disabled futuristic-btn">ArchAngel</button>
            <button type="button" className="btn btn-secondary disabled futuristic-btn">Specter</button>
            <button type="button" className="btn btn-secondary disabled futuristic-btn">Avem</button>
          </div>
        </Slide>
        {showBarbarians && (
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center nft-item">
            <Slide direction='up' duration={1500}>
              <h1 className="h1_head_m set_font">Select Barbarian</h1>
            </Slide>
            <div className="row">
              <NFTImages accountNfts={nfts} onClickImage={(index) => handleStartGame(index)}/>
            </div>
          </div>
        )}
      </>
    )}
    {
    regex.test(accountId) && nfts.length === 0 &&
    <>
      <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-12 text-center wallet-fail">
        <Fade duration={5000}>
        <h1 className="h1_heading set_font">You don't have the required Barbarian Inc NFT's to play</h1>
        </Fade>
      </div>
    </>
  }
    </div>
  </section>
	</>
  );
};

export default Play;
