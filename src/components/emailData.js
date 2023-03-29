import { Amplify, API } from 'aws-amplify';
import awsmobile from '../aws-exports';
import React, {useState} from 'react';


Amplify.configure(awsmobile);

const apiName = 'lostones';
const path = '/mailing';

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
      <h1 style={{color: '#FFFFFF' }}>Join the Tribe</h1>
      <label style={{ color: '#FFFFFF' }}>Keep up to date with the latest</label>
              <div className="input-button-wrapper">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Type your email..."
            required
          />
        <button style={{ backgroundColor: '#1E1E1E', color: '#FFFFFF', border: '2px solid #2B2B2B', borderRadius: '5px', padding: '5px 10px' }}>Subscribe</button>
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
          color: #FFFFFF;
          text-align: center;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
}

export default MailingListAdd
