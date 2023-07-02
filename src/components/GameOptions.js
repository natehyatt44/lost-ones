import React, {useState, useEffect} from 'react';
import { NFTImages } from '../components/ConnectWallet';
import { s3accountActivity, uploadCsv } from '../constants/Constants';
import { CheckAccount } from '../components/GameChecks';
const { Slide, Fade } = require("react-awesome-reveal");

function GameOptions({accountId, nfts, navigate}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showCharacters, setShowCharacters] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedRace, setSelectedRace] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [accessibleChapters, setAccessibleChapters] = useState([]);
  const [heldRaces, setHeldRaces] = useState([]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const scrollbarHeight = isMobile ? 450 : 600;

  useEffect(() => {
    const fetchGameChecks = async () => {
      const gameChecks = await CheckAccount(accountId, nfts);
      setAccessibleChapters(gameChecks.accessibleChapters);
      setHeldRaces(gameChecks.heldRaces);
    };

    fetchGameChecks();
  }, [accountId, nfts]);

  const checkRaceExists = (race) => {
    return heldRaces.includes(race);
  };

  const checkChapterExists = (chapter) => {
    return accessibleChapters.includes(chapter);
  };

  function handleCharacterSelect(index) {
    setSelectedCharacter(index);
  }

  function handleChapterButtonClick(chapter) {
    setSelectedChapter(chapter);
    setShowCharacters(true);
  }

  function handleRaceButtonClick(race) {
    setSelectedRace(race);
  }
  

  function resetRace() {
    setSelectedRace(null);
  }

  function resetChapter() {
    setSelectedChapter(null);
    setShowCharacters(false);
  }


  function handleStartGame(index) {
      setSelectedImage(index)
      console.log(index)
      const dateTimeString = new Date().toISOString().replace('T', ' ').slice(0, 19);
      uploadCsv(`accountId|type|nfts|dateTime\n${accountId}|Start-Game|${nfts}|${dateTimeString}`, `${s3accountActivity}/activity-${accountId}-${dateTimeString}.csv`)
      navigate('/game', {state:{selectedImage: index, accountId: accountId, selectedChapter: selectedChapter, selectedRace: selectedRace}});
    }


    return (
      <>
         {!selectedChapter && !selectedRace && (
          <>
          <Fade duration={3000}>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center nft-item">
            <h3 className="h1_head_xs set_font">Welcome #{accountId}</h3>
          </div>
          </Fade>
          <Fade duration={5000}>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center nft-item">
              <h2 className="h1_head_game set_font">Select Race</h2>
            </div>
            </Fade>
          <Slide direction='right' duration={1500}>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center btn-list">
              <button type="button" variant="dark" className="btn btn-primary futuristic-btn" onClick={() => handleRaceButtonClick("Mortal")}>Mortal</button>
              <button type="button" className={`btn ${checkRaceExists("Gaian") ? "btn-primary" : "btn-secondary disabled"} futuristic-btn`}>Gaian</button>
              <button type="button" className={`btn ${checkRaceExists("Runekin") ? "btn-primary" : "btn-secondary disabled"} futuristic-btn`}>Runekin</button>
              <button type="button" className={`btn ${checkRaceExists("Soulweaver") ? "btn-primary" : "btn-secondary disabled"} futuristic-btn`}>Soulweaver</button>
              <button type="button" className={`btn ${checkRaceExists("Zephyr") ? "btn-primary" : "btn-secondary disabled"} futuristic-btn`}>Zephyr</button>
              <button type="button" className={`btn ${checkRaceExists("ArchAngel") ? "btn-primary" : "btn-secondary disabled"} futuristic-btn`}>ArchAngel</button>
            </div>
          </Slide>
          </>
         )}
          {!selectedChapter && selectedRace && (
            <>
          <Fade duration={5000}>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center nft-item">
              <h2 className="h1_head_game set_font">Select Chapter</h2>
            </div>
            </Fade>
            <Slide direction='left' duration={1500}>
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center btn-list">
                <button type="button" variant="dark" className="btn btn-primary futuristic-btn" onClick={() => handleChapterButtonClick("Chapter 1-1")}>Chapter 1-1</button>
                <button 
                  type="button" 
                  className={`btn ${checkChapterExists("Chapter 1-2") ? "btn-primary" : "btn-secondary disabled"} futuristic-btn`} 
                  {...(checkChapterExists("Chapter 1-2") && { onClick: () => handleChapterButtonClick("Chapter 1-2")})}
                >
                  Chapter 1-2
                </button>
                <button 
                  type="button" 
                  className={`btn ${checkChapterExists("Chapter 2") ? "btn-primary" : "btn-secondary disabled"} futuristic-btn`} 
                  {...(checkChapterExists("Chapter 2") && { onClick: () => handleChapterButtonClick("Chapter 2")})}
                >
                  Chapter 2
                </button>
                <button 
                  type="button" 
                  className={`btn ${checkChapterExists("Chapter 3") ? "btn-primary" : "btn-secondary disabled"} futuristic-btn`} 
                  {...(checkChapterExists("Chapter 3") && { onClick: () => handleChapterButtonClick("Chapter 3")})}
                >
                  Chapter 3
                </button>
                <button 
                  type="button" 
                  className={`btn ${checkChapterExists("Chapter 4") ? "btn-primary" : "btn-secondary disabled"} futuristic-btn`} 
                  {...(checkChapterExists("Chapter 4") && { onClick: () => handleChapterButtonClick("Chapter 4")})}
                >
                  Chapter 4
                </button>
                <button 
                  type="button" 
                  className={`btn ${checkChapterExists("Chapter 5") ? "btn-primary" : "btn-secondary disabled"} futuristic-btn`} 
                  {...(checkChapterExists("Chapter 5") && { onClick: () => handleChapterButtonClick("Chapter 5")})}
                >
                  Chapter 5
                </button>
                <button type="button" className="btn btn-primary active futuristic-btn" onClick={() => resetRace()}>Back</button>
              </div>
            </Slide>
          </>
          )}
          {showCharacters && (
            <>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center btn-list-clicked">
              {/* <button type="button" className="btn btn-secondary disabled futuristic-btn-clicked">Race: {selectedRace}</button>
              <button type="button" className="btn btn-secondary disabled futuristic-btn-clicked">Chapter: {selectedChapter}</button> */}
              <button type="button" className="btn btn-primary active futuristic-btn" onClick={() => resetChapter()}>Back</button>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center nft-item">
              <Fade duration={5000}>
                <h2 className="h1_head_game set_font">Select Character</h2>
              </Fade>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center nft-item" style={{ maxHeight: scrollbarHeight, overflowY: 'auto' }}>
              <div className="row">
                <NFTImages accountNfts={nfts} onClickImage={(index) => handleStartGame(index)}/>
              </div>
            </div>
            </>
          )}
      </>
    );
  }

export default GameOptions;

