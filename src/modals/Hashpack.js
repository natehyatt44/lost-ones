import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ConnectHashPack, ConnectHashPackExtension, AccountNFTs, PairHashPack } from '../components/ConnectWallet';


function Hashpack(props) {
    const [show, setShow] = useState(false);
    const [accountId, setAccountId] = useState('');
    const [nfts, setNfts] = useState([]);
  
    const handleClose = () => setShow(false);
  
    const connectHashPackExtension = async () => {
        const hashpackdata = await ConnectHashPackExtension()
        const accountId = await PairHashPack()
        let accid = accountId.toString()
        setAccountId(accountId)
        const nfts = await AccountNFTs(accid)
        setNfts(nfts)
        props.onConnect(accid, nfts);
    };
  
    const copyPairingString = async () => {
        const hashpackdata = await ConnectHashPack()
        navigator.clipboard.writeText(hashpackdata.initData.pairingString)
        const accountId = await PairHashPack() // '0.0.1846'
        let accid = accountId.toString()
        await setAccountId(accountId)
        const nfts = await AccountNFTs(accid)
        //nfts.push(4,90,133, 149, 155, 961)
        setNfts(nfts)
        props.onConnect(accid, nfts);
    };
  
    return (
      <>
        <Button variant="primary" size="lg" onClick={() => setShow(true)} className="connect-wallet-btn">
        Connect Wallet
        </Button>

        {show && (
          <Modal
            {...props}
            show={show}
            onHide={handleClose}
            keyboard={false}
            animation={true}
            centered
          >
            <Modal.Body className="hashpack-modal">
              <img
                src="assets/images/icon/hashpack.png"
                height="100%"
                width="100%"
                alt="hashpack"
              />
            </Modal.Body>
            <Modal.Footer className="hashpack-modal-footer">
              <Button variant="dark" onClick={connectHashPackExtension}>
                Connect HashPack Extension
              </Button>
              <Button variant="dark" onClick={copyPairingString}>
                Copy Pairing String
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </>
    );
  }
  

export default Hashpack