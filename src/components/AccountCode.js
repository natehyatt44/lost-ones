import React, { useState, useEffect } from 'react';
import { Storage } from 'aws-amplify';
import { barbIncNFTTokens } from '../constants/Constants';
import { AccountNFTs } from '../components/ConnectWallet';

function DarkPopup({ showPopup, setShowPopup, onAccountCodeSubmit }) {
  const [accountCode, setAccountCode] = useState('');
  const [accountId, setAccountId] = useState('');
  const [nfts, setNfts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [accountCodes, setAccountCodes] = useState([]);

  useEffect(() => {
    async function fetchAccountCodes() {
      try {
        const signedUrl = await Storage.get("accountCode/accountCodes.csv", { level: "public" });
        const response = await fetch(signedUrl);
        const textContent = await response.text();

        const rows = textContent.trim().replace(/\r/g, '').split("\n");
        setAccountCodes(rows);
        console.log(rows)
      } catch (error) {
        console.error("Error fetching account codes:", error);
      }
    }

    fetchAccountCodes();
  }, []);

  const handleInputChange = (e) => {
    setAccountCode(e.target.value);
  };

  const handleAccountCode = async () => {
    console.log('Account Code:', accountCode);
    console.log(accountCodes)
    const matchingAccounts = accountCodes.filter((row) => {
      const [, code] = row.split('|');
      return code === accountCode;
    });
  
    if (matchingAccounts.length > 0) {
      const [accountId] = matchingAccounts[0].split('|');
      setAccountId(accountId);
      console.log('Account Id:', accountId);
  
      const nfts = await AccountNFTs(accountId.toString(), barbIncNFTTokens);
      setNfts(nfts);
  
      onAccountCodeSubmit(accountId, nfts);
      setShowPopup(false);
    } else {
      const errorMessage = 'Account Code Does Not Exist';
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
