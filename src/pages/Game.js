import React, {useState, useEffect, useCallback  } from 'react';
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
  const selectedRace = location.state.selectedRace;
  const selectedChapter = location.state.selectedChapter;
  const chapterPass = location.state.chapterPass;
  const path = location.state.path;
  
  const [text, setText] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const isMobile = windowWidth < 768;
  const scrollbarHeight = isMobile ? 430 : 600;

  async function updateAccountStatusCsv(updatedData) {
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
          existingContent = 'accountId|status|race|isActive|date';
        }
      } catch (error) {
        console.log('File not found. Creating a new one.');
        existingContent = 'accountId|status|race|isActive|date';
      }
  
      const lines = existingContent.split('\n');
      const header = lines.shift();
      
      const updatedDataArray = updatedData.split('|');
      
      const accountIndex = lines.findIndex((line) => {
        const lineData = line.split('|');
        return lineData[0] === updatedDataArray[0] && // Compare accountId
               lineData[1] === updatedDataArray[1] && // Compare status
               lineData[2] === updatedDataArray[2];   // Compare race
      });
  
      if (accountIndex >= 0) {
        const lineData = lines[accountIndex].split('|');
        // Only update if isActive changes from 0 to 1
        if(lineData[3] !== updatedDataArray[3]) {
          // Update date
          updatedDataArray[4] = new Date().toISOString().replace('T', ' ').slice(0, 19);
          // Update existing account record
          lines[accountIndex] = updatedDataArray.join('|');
        }
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

  const handleFailedChapter = () => {
    props.setPlayKey(Date.now());  // Update the Play component's key
    navigate('/play');
  };
  
  const handleFinishedChapter = () => {
    const dateTimeString = new Date().toISOString().replace('T', ' ').slice(0, 19);
    let race = ''
    if (selectedChapter === 'Chapter 1-1' || selectedChapter === 'Chapter 1-2'){
      race = 'Universal'
    }
    else {race = selectedRace}
    uploadCsv(`accountId|type|nfts|dateTime\n${accountId}|${selectedChapter}${path} Completed|${race}|${dateTimeString}`, `${s3accountActivity}/activity-${accountId}-${dateTimeString}.csv`)
      .then(() => {
        console.log('Chapter completion recorded in activity CSV.');
        const updatedData = `${accountId}|${selectedChapter}${path} Completed|${race}|1|${dateTimeString}`;
        console.log(updatedData)
        return updateAccountStatusCsv(updatedData);
      })
      .then(() => {
        console.log('Account status CSV updated successfully!');
        props.setPlayKey(Date.now());  // Update the Play component's key
        navigate('/play');  // Navigate to /play
      })
  };  

  async function fetchStory() {
    try {
      let signedUrl = ''
      if (selectedChapter === 'Chapter 1-1' || selectedChapter === 'Chapter 1-2'){
        signedUrl = await Storage.get(`chapters/universal/${selectedChapter}.txt`, { level: "public" });
      }
      else {
        if ((selectedChapter === 'Chapter 2' || selectedChapter === 'Chapter 5') && chapterPass === 1) {
          signedUrl = await Storage.get(`chapters/${selectedChapter}/${selectedRace}/Pass.txt`, { level: "public" });
        }
        else if ((selectedChapter === 'Chapter 3' || selectedChapter === 'Chapter 4') && chapterPass === 1 && path === 'A'){
          signedUrl = await Storage.get(`chapters/${selectedChapter}/${selectedRace}/PassA.txt`, { level: "public" });
        }
        else if ((selectedChapter === 'Chapter 3' || selectedChapter === 'Chapter 4') && chapterPass === 1 && path === 'B'){
          signedUrl = await Storage.get(`chapters/${selectedChapter}/${selectedRace}/PassB.txt`, { level: "public" });
        }
        else {
          signedUrl = await Storage.get(`chapters/${selectedChapter}/${selectedRace}/Fail.txt`, { level: "public" });
        }
      }
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


  const chapterHeader = selectedChapter;
  const story = `${text}\n\n`;

  return (
   <> 
   <section id="faq " className={`background_play_options background_play_${selectedRace}`}>
    <br/><br/>
    <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center story-container">
            <Fade duration={10000}><h1 className="h1_head_m set_font">{chapterHeader}</h1></Fade>
        </div>
      </div>
      <Fade duration={10000} top>
    <div className="row">
      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-left story-container">
      <Scrollbar style={{ height: scrollbarHeight, width: "85%", margin: "auto" , display: "block", backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
        <pre className="para_p" style={{ width: "95%", height: "95%", margin: "auto" }}>{story}</pre>
      </Scrollbar>
      </div>
    </div>
    </Fade>
    <Fade duration={20000}>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
            <Button
              onClick={chapterPass === 0 ? handleFailedChapter : handleFinishedChapter}
              style={{
                backgroundColor: "#1a1a1a",
                borderColor: "#1a1a1a",
                color: "#fff",
                marginTop: "15px",
              }}
            >
              {chapterPass === 0 ? `Failed ${selectedChapter}` : `Complete ${selectedChapter}`}
            </Button>
          </div>
        </div>
      </Fade>
  </section>
	</>
  );
};

export default Game;
