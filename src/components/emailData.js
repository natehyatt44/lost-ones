import { Amplify, API, Storage } from 'aws-amplify';
import awsmobile from '../aws-exports';
import React, {useEffect, useState} from 'react';
import { partition } from '@jest/expect-utils';


Amplify.configure(awsmobile);

const apiName = 'lostones';
const path = '/mailing';
const partitionKey = '/createDate'


function Popup({ message, onClose }) {
    return (
      <div className="overlay">
        <div className="popup">
          <h2 style={{color: 'white' }}>{message}</h2>
          <button onClick={onClose}>Close</button>
        </div>
        <style jsx>{`
          .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0);
            display: flex;
            align-items: center;
            justify-content: center;
          }
  
          .popup {
            background-color: black;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0);
          }
  
          h2 {
            margin-top: 0;
          }
  
          button {
            margin-top: 10px;
          }
        `}</style>
      </div>
    );
  }


function MailingListAdd() {
    const [email, setEmail] = useState('');
    const [response, setResponse] = useState('');
  
    const submitEmail = (event) => {
      event.preventDefault();
  
      // Validate the email address
      if (!isValidEmail(email)) {
        setResponse('Please enter a valid email address');
        setTimeout(clearResponse, 5000);
        return;
      }
  
      API.post(apiName, path, {
        body: {
          Email: email,
          lastSentDate: null,
          createDate: new Date()
        }
    }
    )
  
      setResponse('Email added to the list');
      setEmail('');
      setTimeout(clearResponse, 5000);
    };

    const clearResponse = () => {
        setResponse('');
      };

       
    const isValidEmail = (email) => {
        // Use a regular expression to validate the email address
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
      };

 return (
    <div className="container">
      <form onSubmit={submitEmail}>
      <div className="input-wrapper">
      <h1 style={{color: 'white' }}>Join the Tribe</h1>
      <label style={{ color: 'white' }}>Keep up to date with the latest</label>
              <div className="input-button-wrapper">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Type your email..."
            required
          />
        <button style={{ backgroundColor: 'blue', color: 'white',  }}>Subscribe</button>
        </div>
        <div className="response">{response}</div>
        </div>
      </form>
     
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          flex-direction: row;
          height: 15vh;
          background-color: black;
        }
        .input-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
          font-weight: bold;
        }
        button {
          margin-left: 10px;
        }
        .response {
          color: red;
          text-align: center;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
}

export default MailingListAdd
