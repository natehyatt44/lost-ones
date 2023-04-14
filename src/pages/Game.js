import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import { Storage } from 'aws-amplify';
import { Scrollbar } from 'react-scrollbars-custom';
import { useLocation } from 'react-router-dom';
import { TypeWriter } from "../animations/TypeWriter";
const { Slide, Fade } = require("react-awesome-reveal");

async function uploadCsv(textData, fileName) {
  const csvBlob = new Blob([textData], { type: 'text/csv' });
  await Storage.put(fileName, csvBlob, {
    contentType: 'text/csv'
  });
  console.log('File uploaded successfully!');
  }

function Game(props) {
  const location = useLocation();
  const accountId = location.state.accountId;
  const nfts = location.state.nfts;
  const selectedImage = location.state.selectedImage;
  const [text, setText] = useState('');

  async function fetchStory() {
    try {
      const signedUrl = await Storage.get("chapter1/story.txt", { level: "public" });
      const response = await fetch(signedUrl);
      const textContent = await response.text();
      setText(textContent);
    } catch (error) {
      console.error("Error fetching story:", error);
    }
  }

  useEffect(() => {
    fetchStory();
  }, []);

  const story = TypeWriter(text);

  const handleExitGame = () => {
    const dateTimeString = new Date().toISOString().replace('T', ' ').slice(0, 19);
      uploadCsv(`accountId|type|nfts|dateTime\n${accountId}|Exit|${nfts}|${dateTimeString}`, `accountActivity/activity-${accountId}-${dateTimeString}.csv`)
      .then(() => {
        console.log('CSV file uploaded successfully!');
      })
      .catch((error) => {
        console.error('Error uploading CSV file:', error);
      });
    window.location.href = '/';
  };

  return (
   <> 
    <Fade duration={10000} top>
    <div className="row">
      <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-1 text-left nft-item">
        <Fade duration={15000} top>
          <img src={selectedImage} alt="selected-nft" style={{ borderRadius:"50%", width:"100%", height:"100%" }} /> 
        </Fade>
      </div>
      <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-10 text-right nft-item">
        <Fade duration={15000} top>
            <Button variant="primary" size="lg" onClick={handleExitGame} className="connect-wallet-btn">
              Exit Game
            </Button>
        </Fade>
      </div>
    </div>
    <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center story-container">
            <Slide direction='down' duration={30000}><h1 className="h1_head_sml set_font"> Chapter 1 </h1></Slide>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center story-container">
            <Scrollbar style={{ height: 500}}>
              <pre className="para_p">
                  {story}
              </pre>
            </Scrollbar>
        </div>
      </div>
  </Fade>
	</>
  );
};

export default Game;
