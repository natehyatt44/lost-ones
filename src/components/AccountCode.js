import React, { useState } from 'react';

function DarkPopup({ showPopup, setShowPopup }) {
    const [accountId, setAccountId] = useState('');
  
    const handleInputChange = (e) => {
      setAccountId(e.target.value);
    };
  
    const handleAccountCode = () => {
      console.log('Account ID:', accountId);
      setShowPopup(false);
    };
  
    const handleClose = () => {
      setShowPopup(false);
    };
  
    return showPopup ? (
      <div className="dark-popup">
        <h3>Enter Account ID</h3>
        <input
          type="text"
          value={accountId}
          onChange={handleInputChange}
          style={{ color: '#fff' }}
        />
        <button onClick={handleAccountCode}>Submit</button>
        <button onClick={handleClose}>Close</button>
      </div>
    ) : null;
  }
  
  export default DarkPopup;