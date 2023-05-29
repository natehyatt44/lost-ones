import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {
  ConnectHashPack,
  HashPackExtension,
  AccountNFTs,
  PairHashPack,
} from '../components/ConnectWallet';
import { barbIncNFTTokens } from '../constants/Constants'

function Hashpack({ onConnect, showModal, onClose }) {
  const [show, setShow] = useState(false);
  const [accountId, setAccountId] = useState('');
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    setShow(showModal);
  }, [showModal]);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  // Connect to HashPack extension and fetch account data
  const connectHashPackExtension = async () => {
    const hashpackdata = await HashPackExtension();
    const accountId = await PairHashPack();
    setAccountId(accountId);
    const nfts = await AccountNFTs(accountId.toString(), barbIncNFTTokens);
    setNfts(nfts);
    onConnect(accountId, nfts);
  };

  // Copy pairing string and fetch account data
  const copyPairingString = async () => {
    const hashpackdata = await ConnectHashPack();
    navigator.clipboard.writeText(hashpackdata.initData.pairingString);
    const accountId = await PairHashPack();
    setAccountId(accountId);
    const nfts = await AccountNFTs(accountId.toString(), barbIncNFTTokens);
    setNfts(nfts);
    onConnect(accountId, nfts);
  };

  return (
    <>
        <Modal
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
      
    </>
  );
}

export default Hashpack;
