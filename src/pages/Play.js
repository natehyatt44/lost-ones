import React, {useState, useEffect} from 'react';
import Hashpack from '../modals/Hashpack';
import GameOptions from '../components/GameOptions';
import {AccountNFTs} from '../components/ConnectWallet';
import { barbInkNFTTokens } from '../constants/Constants'
import { useNavigate } from 'react-router-dom';
import GameStats from '../components/GameStats';
import { s3accountActivity, uploadCsv } from '../constants/Constants';
import Menu from '../components/Menu';
const { Fade } = require("react-awesome-reveal");

const regex = /^0\.0\..*/;

function Play() {
  const [accountId, setAccountId] = useState('')
  const [nfts, setNfts] = useState([])
  const [nftAmt, setNftAmt] = useState([])
  const [show, setShow] = useState(false);
  const [stats, setStats] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRace, setSelectedRace] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAccountId = window.localStorage.getItem('accountId');

    if (storedAccountId) {
      setAccountId(storedAccountId);
    }
  }, []);

  if (selectedRace) {
    console.log(`Selected race is: ${selectedRace}`);
  }

  const handleHashpackConnect = (accountId, nfts) => {
    setAccountId(accountId);
    window.localStorage.setItem('accountId', accountId);

    setNfts(nfts);

    const jsonObj = JSON.parse(nfts);
    setNftAmt(jsonObj.nftMetadata.length);

    if (regex.test(accountId)){
      const dateTimeString = new Date().toISOString().replace('T', ' ').slice(0, 19);
      uploadCsv(`accountId|type|nfts|dateTime\n${accountId}|Connect-Hashpack|${nfts}|${dateTimeString}`, `${s3accountActivity}/activity-${accountId}-${dateTimeString}.csv`)
      setStats(false)
      setShow(false)
    }
  };
  
  const handleExit = () => {
    window.location.href = '/';
  };

  const handleShow = () => {
    setShow(true);
  }
  const handlePlay = async () => {
    setStats(false)
    const nfts = await AccountNFTs(accountId.toString(), barbInkNFTTokens);
    setNfts(nfts);

    const jsonObj = JSON.parse(nfts);
    setNftAmt(jsonObj.nftMetadata.length);
}


  const handleStats = () => setStats(true);
  const handleModalClose = () => {setShow(false);};
  const handleTogglePopup = () => {
    setShowPopup(!showPopup);
  };

  const disconnectHashpack = () => {
    setAccountId(null);
    window.localStorage.removeItem('accountId');
    setStats(true);
  }

  return (
   <> 
   
   {stats === true && 
   <>
   <section id="Play " className="background_play_stats ">
   <div className="nft-container ">
    <div className="row">
      <div className="col-4 col-sm-4 col-md-4 col-lg-3 col-xl-1 text-center nft-item">
      <Menu 
          handleShow={handleShow} 
          handlePlay={handlePlay}
          accountId={accountId} 
          disconnectHashpack={disconnectHashpack} 
          handleStats={handleStats} 
          handleExit={handleExit} 
        />
      </div>
    </div>
    <GameStats 
      handleHashpackConnect={handleHashpackConnect} 
      show={show} 
      handleModalClose={handleModalClose} 
      showPopup={showPopup} 
      setShowPopup={setShowPopup} 
    />
    </div>
    </section>
  </>
  }
    {regex.test(accountId) && nftAmt > 0 && stats === false &&( 
      <>
      <section id="Play " className={`background_play_options background_play_${selectedRace}`}>
      <div className="nft-container ">
      <div className="row">
        <div className="col-4 col-sm-4 col-md-4 col-lg-3 col-xl-1 text-center nft-item">
        <Menu 
            handleShow={handleShow} 
            handlePlay={handlePlay}
            accountId={accountId} 
            disconnectHashpack={disconnectHashpack} 
            handleStats={handleStats} 
            handleExit={handleExit} 
          />
        </div>
      </div>
        <GameOptions
          accountId={accountId}
          nfts={nfts}
          navigate={navigate}
          onRaceSelect={setSelectedRace}
        />
         </div>
    </section>
      </>
    )}
    {
    regex.test(accountId) && nftAmt === 0 && stats === false &&
    <>
    <section id="Play " className="background_play_stats ">
    <div className="nft-container ">
      <div className="row">
        <div className="col-4 col-sm-4 col-md-4 col-lg-3 col-xl-1 text-center nft-item">
        <Menu 
            handleShow={handleShow} 
            handlePlay={handlePlay}
            accountId={accountId} 
            disconnectHashpack={disconnectHashpack} 
            handleStats={handleStats} 
            handleExit={handleExit} 
          />
        </div>
      </div>
      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center wallet">
        <Fade duration={5000}>
        <h1 className="h1_head_m set_font">You do not have the required NFT's</h1>
        <h3 className="h1_head_xs set_font">Please navigate to the Guide for more Information</h3>
        </Fade>
        <Hashpack onConnect={handleHashpackConnect} showModal={show} onClose={handleModalClose} />
      </div>
      </div>
    </section>
    </>
  }
	</>
  );
};

export default Play;
