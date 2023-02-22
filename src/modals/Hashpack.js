import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { pairHashPack, NFTImages } from '../components/ConnectWallet';

function Hashpack() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [pairingString, setPairingString] = useState('')
  const [accountId, setAccountId] = useState('')
  const [nfts, setNfts] = useState('')


  return (
    <>
       <Button variant="dark" size='lg' onClick={handleShow}>
         Connect Wallet
       </Button>
    
      <Modal 
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        animation="true"
        
      >
        <Modal.Body className='hashpack-modal'>
          <img src="assets/images/icon/hashpack.png" 
               height='100%'
               width='100%'
               alt="hashpack"></img>
        </Modal.Body>
        <Modal.Footer className='hashpack-modal-footer'>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={async () => {
                const saveData = await pairHashPack()
                setPairingString(saveData.initData.pairingString)
                setAccountId(saveData.accountId)
                setNfts(saveData.nfts)
            }}>Connect
          </Button>
          {
            pairingString &&
            <>
              <Button variant="dark" onClick={() => navigator.clipboard.writeText(pairingString)}>
                Copy Pairing String
              </Button>
            </>
          }
        </Modal.Footer>
      </Modal> 
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
    </>
  );
}

export default Hashpack