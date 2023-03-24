import React, {useState, useEffect} from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ConnectHashPack, ConnectHashPackExtension, AccountNFTs, NFTImages, PairHashPack } from '../components/ConnectWallet';
import { Scrollbar } from 'react-scrollbars-custom';
const { Slide, Fade } = require("react-awesome-reveal");

const regex = /^0\.0\..*/;
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

  function handleRaceButtonClick() {
    setShowBarbarians(true);
    setShowRaceSelection(false)
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
              <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-12 text-center nft-item">
                <h2 className="h1_head_m set_font">Select Race</h2>
              </div>
            </Slide>
            <Slide direction='left' duration={1500}>
              <div className="col-12 text-center btn-list">
                <button type="button" variant="dark" className="btn btn-primary active futuristic-btn" onClick={handleRaceButtonClick}>Mortal</button>
                <button type="button" className="btn btn-secondary disabled futuristic-btn">Alluvial</button>
                <button type="button" className="btn btn-secondary disabled futuristic-btn">Elven</button>
                <button type="button" className="btn btn-secondary disabled futuristic-btn">ArchAngel</button>
                <button type="button" className="btn btn-secondary disabled futuristic-btn">Specter</button>
                <button type="button" className="btn btn-secondary disabled futuristic-btn">Avem</button>
              </div>
            </Slide>
            {showBarbarians && (
              <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-12 text-center nft-item">
                <Slide direction='up' duration={1500}>
                  <h1 className="h1_head_m set_font">Select Barbarian</h1>
                </Slide>
                <div className="row">
                  <NFTImages accountNfts={nfts} onClickImage={(index) => setSelectedImage(index)}/>
                </div>
              </div>
            )}
          </>
        )}

        {isImageSelected && (
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
                  <Slide direction='down' duration={30000}><h1 className="h1_head_sml set_font"> Chapter 1 </h1></Slide>
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
