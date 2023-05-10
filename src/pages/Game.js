import React, {useState, useEffect } from 'react';
import { Storage } from 'aws-amplify';
import { Scrollbar } from 'react-scrollbars-custom';
import { useLocation, useNavigate  } from 'react-router-dom';
import { Dropdown, Button } from 'react-bootstrap';
import { s3accountActivity, s3accountStats } from '../constants/Constants';
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
  const navigate = useNavigate (); // Add this line to use the 'history' object for navigation
  const accountId = location.state.accountId;
  const nfts = location.state.nfts;
  const selectedImage = location.state.selectedImage;
  const [text, setText] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const scrollbarHeight = isMobile ? 370 : 540;

  async function updateAccountStatusCsv(accountId, updatedData) {
    try {
      const filePath = `${s3accountStats}/accounts.csv`;
      let existingContent = '';
  
      try {
        const signedUrl = await Storage.get(filePath, { level: 'public' });
        const response = await fetch(signedUrl);
        if (response.status === 200) {
          existingContent = await response.text();
        } else {
          console.log('File not found. Creating a new one.');
          existingContent = 'accountId|status|race|date';
        }
      } catch (error) {
        console.log('File not found. Creating a new one.');
        existingContent = 'accountId|status|race|date';
      }
  
      const lines = existingContent.split('\n');
      const header = lines.shift();
      const accountIndex = lines.findIndex((line) => line.startsWith(accountId));
  
      if (accountIndex >= 0) {
        // Update existing account record
        lines[accountIndex] = updatedData;
      } else {
        // Add a new account record
        lines.push(updatedData);
      }
  
      // Combine header and updated lines
      const updatedCsvContent = [header, ...lines].join('\n');
  
      // Upload the updated CSV file
      await uploadCsv(updatedCsvContent, filePath);
    } catch (error) {
      console.error('Error updating account status CSV:', error);
    }
  }
  
  const handleFinishedChapter = () => {
    const dateTimeString = new Date().toISOString().replace('T', ' ').slice(0, 19);
    uploadCsv(`accountId|type|nfts|dateTime\n${accountId}|Complete-Chapter1|${selectedImage}|${dateTimeString}`, `${s3accountActivity}/activity-${accountId}-${dateTimeString}.csv`)
      .then(() => {
        console.log('Chapter completion recorded in activity CSV.');
        const updatedData = `${accountId}|Complete-Chapter1|Mortal|${dateTimeString}`;
        console.log(updatedData)
        return updateAccountStatusCsv(accountId, updatedData);
      })
      .then(() => {
        console.log('Account status CSV updated successfully!');
        navigate('/play');
      })
  };  

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


  const chapterHeader = "Chapter 1";
  const story = text;

  const handleExitGame = () => {
    const dateTimeString = new Date().toISOString().replace('T', ' ').slice(0, 19);
    uploadCsv(`accountId|type|nfts|dateTime\n${accountId}|Exit|${selectedImage}|${dateTimeString}`, `${s3accountActivity}/activity-${accountId}-${dateTimeString}.csv`)
    window.location.href = '/';
  };

  return (
   <> 
   <section id="faq " className="background_game">
    <Fade duration={5000} top>
    <div className="row">
      <div className="col-4 col-sm-4 col-md-4 col-lg-3 col-xl-1 text-center nft-item">
        <Fade duration={7000} top>
        <Dropdown>
          <Dropdown.Toggle variant="primary" size="lg" id="dropdown-basic" style={{ backgroundColor: '#1a1a1a', borderColor: '#1a1a1a', color: '#fff' }}>
            Menu
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ backgroundColor: '#1a1a1a', borderColor: '#1a1a1a' }}>
            <Dropdown.Item onClick={handleExitGame} style={{ color: '#fff' }}>Exit Game</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </Fade>
      </div>
      <div className="col-5 col-sm-4 col-md-4 col-lg-3 col-xl-1 text-center nft-item">
        <Slide direction='right' duration={7000}>
          <img src={selectedImage} alt="selected-nft" style={{ borderRadius:"50%", width:"100%", height:"100%" }} /> 
        </Slide>
      </div>
    </div>
   </Fade>
    <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center story-container">
            <Fade duration={10000}><h1 className="h1_head_m set_font">{chapterHeader}</h1></Fade>
        </div>
      </div>
    <Fade duration={10000} top>
    <div className="row">
      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center story-container">
        <Scrollbar style={{ height: scrollbarHeight, width: "85%", margin: "auto" , display: "block"}}>
          <pre className="para_p">{story}</pre>
        </Scrollbar>
      </div>
    </div>
    </Fade>
    <Fade duration={10000} top>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
            <Button
              onClick={handleFinishedChapter}
              style={{
                backgroundColor: "#1a1a1a",
                borderColor: "#1a1a1a",
                color: "#fff",
                marginTop: "15px",
              }}
            >
              Complete Chapter
            </Button>
          </div>
        </div>
    </Fade>
  </section>
	</>
  );
};

export default Game;
