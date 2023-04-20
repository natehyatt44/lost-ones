import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {
  ConnectHashPack,
  ConnectHashPackExtension,
  AccountNFTs,
  PairHashPack,
} from '../components/ConnectWallet';
import { barbIncNFTTokens } from '../constants/Constants'

function Hashpack(props) {
  const [show, setShow] = useState(false);
  const [accountId, setAccountId] = useState('');
  const [nfts, setNfts] = useState([]);

  // Close the modal
  const handleClose = () => setShow(false);

  // Connect to HashPack extension and fetch account data
  const connectHashPackExtension = async () => {
    await ConnectHashPackExtension();
    const accountId = await PairHashPack();
    setAccountId(accountId);
    const nfts = await AccountNFTs(accountId.toString(), barbIncNFTTokens);
    setNfts(nfts);
    props.onConnect(accountId, nfts);
  };

  // Copy pairing string and fetch account data
  const copyPairingString = async () => {
    const hashpackdata = await ConnectHashPack();
    navigator.clipboard.writeText(hashpackdata.initData.pairingString);
    const accountId = await PairHashPack();
    setAccountId(accountId);
    const nfts = await AccountNFTs(accountId.toString(), barbIncNFTTokens);
    setNfts(nfts);
    props.onConnect(accountId, nfts);
  };

  return (
    <>
      <Button
        variant="primary"
        size="lg"
        onClick={() => setShow(true)}
        className="connect-wallet-btn"
      >
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

export default Hashpack;
