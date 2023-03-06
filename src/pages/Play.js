import React, {useState, useEffect} from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ConnectHashPack, ConnectHashPackExtension, AccountNFTs, NFTImages, PairHashPack } from '../components/ConnectWallet';
const { Slide } = require("react-awesome-reveal");

const regex = /^0\.0\..*/;

function Play(props) {
  const handleClose = () => setShow(false);
  const [show, setShow] = useState(true);
  const [accountId, setAccountId] = useState('')
  const [nfts, setNfts] = useState([])
  const [showBarbarians, setShowBarbarians] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  function handleRaceButtonClick() {
    setShowBarbarians(true);
  }

  return (
   <> 
   <Navigation />
   <section id="Play " className="info_sec ">
   <div className="row">
      <Modal 
        {...props}
        show={show}
        onHide={handleClose}
        keyboard={false}
        animation="true"
        centered
      >
        <Modal.Body className='hashpack-modal'>
          <img src="assets/images/icon/hashpack.png" 
              height='100%'
              width='100%'
              alt="hashpack"></img>
        </Modal.Body>
        <Modal.Footer className='hashpack-modal-footer'>
          <Button variant="dark" onClick={async () => {
            const hashpackdata = await ConnectHashPackExtension()
            const accountId = await PairHashPack()
            let accid = accountId.toString()
            setAccountId(accountId)
            const nfts = await AccountNFTs(accid)
            setNfts(nfts)
            }}>Connect HashPack Extension
          </Button>
          <Button variant="dark" onClick={async () => {
            const hashpackdata = await ConnectHashPack()
            navigator.clipboard.writeText(hashpackdata.initData.pairingString)
            const accountId = '0.0.18346' //await PairHashPack()
            let accid = accountId.toString()
            await setAccountId(accountId)
            const nfts = await AccountNFTs(accid)
            nfts.push(4,90,133)
            setNfts(nfts)
          }}>
                Copy Pairing String
          </Button>
        </Modal.Footer>
      </Modal> 
    </div>
    {
      regex.test(accountId) && show === false &&
      <>
      <div className="container nft-container">
        <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-12 text-center">
        <h1 className="h1_heading set_font">Select Your Race</h1>
        </div>
        <div className='row'>
        <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-12 text-center mx-auto btn-list">
        <button type="button" className="btn btn-primary active" onClick={handleRaceButtonClick}>Mortal</button>
        <button type="button" className="btn btn-secondary disabled">Race2</button>
        <button type="button" className="btn btn-secondary disabled">Race3</button>
        <button type="button" className="btn btn-secondary disabled">Race4</button>
        <button type="button" className="btn btn-secondary disabled">Race5</button>
        <button type="button" className="btn btn-secondary disabled">Race6</button>
        </div>
        </div>
    
        {showBarbarians && (
      <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-12 text-center">
        <h1 className="h1_heading set_font">Select Your Barbarian</h1>
        <div className="row">
          <NFTImages accountNfts={nfts} onClickImage={(index) => setSelectedImage(index)}/>
        </div>
      </div>
    )}
    {selectedImage !== null && (
      <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-12 text-center">
      <div className="nft-item">
      <h1 className="h1_heading set_font">Selected</h1>
        <img src={selectedImage} alt="selected-nft" style={{borderRadius:"50%", width:"20%" }} />
      </div>
      </div>
    )}
      </div>
      </>
      
    }
    {
      !regex.test(accountId) && show === false &&
      <>
        <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-12 text-center wallet-fail">
        <h1 className="h1_heading set_font">Please Connect Your Wallet In Order To Play</h1>
        </div>

      </>
    }
   </section>
	</>
  );
};

export default Play;
