import React, {useState, useEffect} from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ConnectHashPack, ConnectHashPackExtension, AccountNFTs, NFTImages } from '../components/ConnectWallet';
const { Slide } = require("react-awesome-reveal");

function Play(props) {
  const handleClose = () => setShow(false);
  const [show, setShow] = useState(true);
  const [hashpackdata, sethashpackdata] = useState('')
  let accountId = '0'
  useEffect(() => {
    accountId = async () => hashpackdata.accountId
  });

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
            await sethashpackdata(hashpackdata)
            }}>Connect HashPack Extension
          </Button>
          <Button variant="dark" onClick={async () => {
            const hashpackdata = await ConnectHashPack()
            navigator.clipboard.writeText(hashpackdata.initData.pairingString)
            await sethashpackdata(hashpackdata)
          }}>
                Copy Pairing String
          </Button>
        </Modal.Footer>
      </Modal> 
    </div>
    {
      accountId !== '0' && show === false &&
      <>
        <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-12 text-center gallery-item">
          <h1>Select Your Hero</h1>
        <div className="row">
        <NFTImages></NFTImages>
        </div>
        </div>
      </>
    }
    {
      accountId === '0' && show === false &&
      <>
        <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-12 text-center gallery-item">
        <h1>Please Connect Your Wallet In Order To Play</h1>
        </div>

      </>
    }
   </section>
	</>
  );
};

export default Play;
