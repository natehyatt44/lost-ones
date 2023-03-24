import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Game from './Game';
import { ConnectHashPack, ConnectHashPackExtension, AccountNFTs, NFTImages, PairHashPack } from '../components/ConnectWallet';
import { Scrollbar } from 'react-scrollbars-custom';
const { Slide, Fade } = require("react-awesome-reveal");

const regex = /^0\.0\..*/;

function Play(props) {
  const handleClose = () => setShow(false);
  const [show, setShow] = useState(true);
  const [accountId, setAccountId] = useState('')
  const [nfts, setNfts] = useState([])
  const [showNavigation, setShowNavigation] = useState(true);
  const [showRaceSelection, setShowRaceSelection] = useState(true);
  const [showBarbarians, setShowBarbarians] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const isImageSelected = selectedImage !== null;
  const navigate = useNavigate();

  function handleRaceButtonClick() {
    setShowBarbarians(true);
    setShowRaceSelection(false)
  }

  function handleStartGame(index) {
    setSelectedImage(index)
    navigate('/game', {state:{selectedImage: index, accountId: accountId}});
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
            nfts.push(4,90,133, 149, 155, 961, 900, 999, 1111, 777, 100, 101)
            setNfts(nfts)
          }}>
                Copy Pairing String
          </Button>
        </Modal.Footer>
      </Modal> 
    </div>
    <div className="nft-container ">
      
        {(!isImageSelected && regex.test(accountId) && !show) && ( 
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

        {isImageSelected && (
          <Link to="/game" state={{selectedImage: selectedImage, accountId: accountId}}>Start Game</Link>
      )}
     
   
    {
      !regex.test(accountId) && show === false &&
      <>
        <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-12 text-center wallet-fail">
          <Fade duration={5000}>
          <h1 className="h1_heading set_font">Connect Wallet In Order To Play</h1>
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
