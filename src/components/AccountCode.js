import React, { useState } from 'react';
import { barbIncNFTTokens } from '../constants/Constants'
import { AccountNFTs } from '../components/ConnectWallet';

function DarkPopup({ showPopup, setShowPopup, onAccountCodeSubmit }) {
  const [accountCode, setAccountCode] = useState('');
  const [accountId, setAccountId] = useState('');
  const [nfts, setNfts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    setAccountCode(e.target.value);
  };

  const handleAccountCode = async () => {
    console.log('Account Code:', accountCode);
    if (accountCode === '30') {
      const accountId = '0.0.1067445';
      setAccountId(accountId);
      console.log('Account Id:', accountId);
  
      const nfts = await AccountNFTs(accountId.toString(), barbIncNFTTokens);
      setNfts(nfts);
  
      onAccountCodeSubmit(accountId, nfts);
      setShowPopup(false);
    } else {
      const errorMessage = 'Account Code Does Not Exist'
      console.log(errorMessage);
      setErrorMessage(errorMessage);
    }
  };
  

  const handleClose = () => {
    setShowPopup(false);
    setAccountCode('');
    setAccountId('');
    setNfts([]);
    setErrorMessage('');
  };

  return showPopup ? (
    <div className="dark-popup-overlay">
      <div className="dark-popup">
        <h3>Enter Account Code</h3>
        <input
          type="text"
          value={accountCode}
          onChange={handleInputChange}
          className="input-dark"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="button-container">
          <button className="btn-dark" onClick={handleAccountCode}>Submit</button>
          <button className="btn-dark" onClick={handleClose}>Close</button>
        </div>
      </div>
    </div>
  ) : null;
  
}

export default DarkPopup;
