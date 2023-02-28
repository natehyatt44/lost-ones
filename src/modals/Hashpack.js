import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ConnectHashPack, PairHashPackExtension } from '../components/ConnectWallet';


function Hashpack(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [hashpackdata, setHashpackdata] = useState('')
  return (
    <>
      <Button variant="dark" size='lg' onClick={async () => {
          //const hashpackdata = await hashconnect()
          console.log(hashpackdata)
          setHashpackdata(hashpackdata)
          setShow(true)
      }}>
        Connect Wallet
      </Button>
{
  hashpackdata &&
  <>
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
                //await PairHashPackExtension()
            }}>Connect HashPack Extension
          </Button>
          <Button variant="dark" onClick={() => navigator.clipboard.writeText(hashpackdata.initData.pairingString)}>
               Copy Pairing String
          </Button>
        </Modal.Footer>
      </Modal> 
  </>
  }
        
    </>
  );
}

export default Hashpack