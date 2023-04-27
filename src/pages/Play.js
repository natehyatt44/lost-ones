import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Hashpack from '../modals/Hashpack';
import { Storage } from 'aws-amplify';
import { Dropdown } from 'react-bootstrap';
import AccountCode from '../components/AccountCode';
import { NFTImages } from '../components/ConnectWallet';

const { Slide, Fade } = require("react-awesome-reveal");

const regex = /^0\.0\..*/;

async function uploadCsv(textData, fileName) {
  const csvBlob = new Blob([textData], { type: 'text/csv' });
  await Storage.put(fileName, csvBlob, {
    contentType: 'text/csv'
  });
  console.log('File uploaded successfully!');
}

function Play() {
  const [accountId, setAccountId] = useState('')
  const [nfts, setNfts] = useState([])
  const [nftAmt, setNftAmt] = useState([])
  const [showBarbarians, setShowBarbarians] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  function handleRaceButtonClick() {
    setShowBarbarians(true);
    const dateTimeString = new Date().toISOString().replace('T', ' ').slice(0, 19);
      uploadCsv(`accountId|type|nfts|dateTime\n${accountId}|SelectedRace|${nfts}|${dateTimeString}`, `accountActivity/activity-${accountId}-${dateTimeString}.csv`)
      .then(() => {
        console.log('CSV file uploaded successfully!');
      })
      .catch((error) => {
        console.error('Error uploading CSV file:', error);
      });
  }

  function handleStartGame(index) {
    setSelectedImage(index)
    const dateTimeString = new Date().toISOString().replace('T', ' ').slice(0, 19);
    uploadCsv(`accountId|type|nfts|dateTime\n${accountId}|SelectedNFT|${nfts}|${dateTimeString}`, `accountActivity/activity-${accountId}-${dateTimeString}.csv`)
    navigate('/game', {state:{selectedImage: index, accountId: accountId}});
  }

  const handleHashpackConnect = (accountId, nfts) => {
    setAccountId(accountId);
    setNfts(nfts);
    const jsonObj = JSON.parse(nfts);
    setNftAmt(jsonObj.nftMetadata.length);

    if (regex.test(accountId)){
      const dateTimeString = new Date().toISOString().replace('T', ' ').slice(0, 19);
      uploadCsv(`accountId|type|nfts|dateTime\n${accountId}|ConnectHashpack|${nfts}|${dateTimeString}`, `accountActivity/activity-${accountId}-${dateTimeString}.csv`)
    }
  };

  const handleAccountCodeSubmit = (accountId, nfts) => {
    setAccountId(accountId);
    setNfts(nfts);
    const jsonObj = JSON.parse(nfts);
    setNftAmt(jsonObj.nftMetadata.length);

    if (regex.test(accountId)){
      const dateTimeString = new Date().toISOString().replace('T', ' ').slice(0, 19);
      uploadCsv(`accountId|type|nfts|dateTime\n${accountId}|AccountCode|${nfts}|${dateTimeString}`, `accountActivity/activity-${accountId}-${dateTimeString}.csv`)
    }
  }
  

  const handleExit = () => {
    window.location.href = '/';
  };

  const handleShow = () => setShow(true);
  const handleModalClose = () => {setShow(false);};
  const handleTogglePopup = () => {
    setShowPopup(!showPopup);
  };

  const checkRaceExists = (race) => {
    const jsonObj = JSON.parse(nfts);
    const { nftMetadata } = jsonObj;
  
    return nftMetadata.some(({ traits }) => {
      return traits.some(({ trait_type, value }) => trait_type === "Race" && value === race);
    });
  };

  return (
   <> 
   <section id="Play " className="background_play ">
   
   <div className="nft-container ">
    <div className="row">
      <div className="col-4 col-sm-4 col-md-4 col-lg-3 col-xl-1 text-center nft-item">
        <Dropdown>
          <Dropdown.Toggle variant="primary" size="lg" id="dropdown-basic" style={{ backgroundColor: '#1a1a1a', borderColor: '#1a1a1a', color: '#fff' }}>
            Menu
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ backgroundColor: '#1a1a1a', borderColor: '#1a1a1a' }}>
            <Dropdown.Item onClick={handleTogglePopup} style={{ color: '#fff' }}>Use Account Code</Dropdown.Item>
            <Dropdown.Item onClick={handleShow} style={{ color: '#fff' }}>Connect Hashpack</Dropdown.Item>
            <Dropdown.Item onClick={handleExit} style={{ color: '#fff' }}>Exit</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      </div>
   {!regex.test(accountId) && 
   <>
    <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center p-0 prologue-item">
          <Hashpack onConnect={handleHashpackConnect} showModal={show} onClose={handleModalClose} />
          <AccountCode showPopup={showPopup} setShowPopup={setShowPopup} onAccountCodeSubmit={handleAccountCodeSubmit} />
        </div>
    </div>
    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center wallet">
      <Fade duration={5000}>
        <h1 className="h1_heading set_font">The Lost Ones</h1>
      </Fade>
    </div>
  </>
  }
    {regex.test(accountId) && nftAmt > 0 &&( 
      <>
        <Fade duration={3000}>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center nft-item">
            <h2 className="h1_head_xs set_font">Welcome #{accountId}</h2>
          </div>
        </Fade>
        <Slide direction='right' duration={2500}>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center nft-item">
            <h2 className="h1_head_m set_font">Select Race</h2>
          </div>
        </Slide>
        <Slide direction='left' duration={3500}>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center btn-list">
            <button type="button" variant="dark" className="btn btn-primary active futuristic-btn" onClick={handleRaceButtonClick}>Mortal</button>
            <button type="button" className={`btn ${checkRaceExists("Leshan") ? "btn-primary" : "btn-secondary disabled"} futuristic-btn`}>Leshan</button>
            <button type="button" className={`btn ${checkRaceExists("Elven") ? "btn-primary" : "btn-secondary disabled"} futuristic-btn`}>Elven</button>
            <button type="button" className={`btn ${checkRaceExists("ArchAngel") ? "btn-primary" : "btn-secondary disabled"} futuristic-btn`}>ArchAngel</button>
            <button type="button" className={`btn ${checkRaceExists("Specter") ? "btn-primary" : "btn-secondary disabled"} futuristic-btn`}>Specter</button>
            <button type="button" className={`btn ${checkRaceExists("Avem") ? "btn-primary" : "btn-secondary disabled"} futuristic-btn`}>Avem</button>
          </div>
        </Slide>
        {showBarbarians && (
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center nft-item">
            <Slide direction='up' duration={1500}>
              <h1 className="h1_head_m set_font">Select Character</h1>
            </Slide>
            <div className="row">
              <NFTImages accountNfts={nfts} onClickImage={(index) => handleStartGame(index)}/>
            </div>
          </div>
        )}
      </>
    )}
    {
    regex.test(accountId) && nftAmt === 0 &&
    <>
      <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-12 text-center wallet">
        <Fade duration={5000}>
        <h1 className="h1_heading set_font">You don't have the required NFT's to play</h1>
        </Fade>
        <Hashpack onConnect={handleHashpackConnect} showModal={show} onClose={handleModalClose} />
        <AccountCode showPopup={showPopup} setShowPopup={setShowPopup} onAccountCodeSubmit={handleAccountCodeSubmit} />
      </div>
    </>
  }
    </div>
  </section>
	</>
  );
};

export default Play;
