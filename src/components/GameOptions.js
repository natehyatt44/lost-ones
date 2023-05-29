import React, {useState} from 'react';
import { NFTImages } from '../components/ConnectWallet';
import { s3accountActivity, uploadCsv } from '../constants/Constants';
const { Slide, Fade } = require("react-awesome-reveal");

function GameOptions({accountId, nfts, navigate}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showCharacters, setShowCharacters] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedRace, setSelectedRace] = useState(null);

  function handleChapterButtonClick(chapter) {
    setSelectedChapter(chapter);
  }

  const checkRaceExists = (race) => {
    // const jsonObj = JSON.parse(nfts);
    // const { nftMetadata } = jsonObj;
  
    // return nftMetadata.some(({ traits }) => {
    //   return traits.some(({ trait_type, value }) => trait_type === "Race" && value === race);
    // });
    return false
  };

  function handleRaceButtonClick(race) {
    setSelectedRace(race);
    setShowCharacters(true);
  }

  function resetSelection() {
    setSelectedChapter(null);
    setSelectedRace(null);
    setShowCharacters(false);
  }


  function handleStartGame(index) {
      setSelectedImage(index)
      console.log(index)
      const dateTimeString = new Date().toISOString().replace('T', ' ').slice(0, 19);
      uploadCsv(`accountId|type|nfts|dateTime\n${accountId}|Select-NFT|${nfts}|${dateTimeString}`, `${s3accountActivity}/activity-${accountId}-${dateTimeString}.csv`)
      navigate('/game', {state:{selectedImage: index, accountId: accountId}});
    }


    return (
      <>
         {!selectedChapter && !selectedRace && (
          <>
          <Fade duration={5000}>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center nft-item">
              <h2 className="h1_head_game set_font">Select Chapter</h2>
            </div>
            </Fade>
          <Slide direction='left' duration={1500}>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center btn-list">
              <button type="button" variant="dark" className="btn btn-primary active futuristic-btn" onClick={() => handleChapterButtonClick("Chapter 1")}>Chapter 1</button>
              <button type="button" className={`btn ${checkRaceExists("Gaian") ? "btn-primary" : "btn-secondary disabled"} futuristic-btn`}>Chapter 2</button>
              <button type="button" className={`btn ${checkRaceExists("Elven") ? "btn-primary" : "btn-secondary disabled"} futuristic-btn`}>Chapter 3</button>
              <button type="button" className={`btn ${checkRaceExists("ArchAngel") ? "btn-primary" : "btn-secondary disabled"} futuristic-btn`}>Chapter 4</button>
            </div>
          </Slide>
          </>
         )}
          {selectedChapter && !selectedRace && (
            <>
          <Fade duration={5000}>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center nft-item">
              <h2 className="h1_head_game set_font">Select Race</h2>
            </div>
            </Fade>
          <Slide direction='right' duration={1500}>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center btn-list">
              <button type="button" variant="dark" className="btn btn-primary active futuristic-btn" onClick={() => handleRaceButtonClick("Mortal")}>Mortal</button>
              <button type="button" className={`btn ${checkRaceExists("Gaian") ? "btn-primary" : "btn-secondary disabled"} futuristic-btn`}>Gaian</button>
              <button type="button" className={`btn ${checkRaceExists("Elven") ? "btn-primary" : "btn-secondary disabled"} futuristic-btn`}>Elven</button>
              <button type="button" className={`btn ${checkRaceExists("ArchAngel") ? "btn-primary" : "btn-secondary disabled"} futuristic-btn`}>ArchAngel</button>
              <button type="button" className={`btn ${checkRaceExists("Specter") ? "btn-primary" : "btn-secondary disabled"} futuristic-btn`}>Specter</button>
              <button type="button" className={`btn ${checkRaceExists("Avem") ? "btn-primary" : "btn-secondary disabled"} futuristic-btn`}>Avem</button>
            </div>
          </Slide>
          </>
          )}
          {showCharacters && (
            <>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center btn-list">
            <button type="button" className="btn btn-secondary disabled futuristic-btn">
              Chapter: {selectedChapter}
            </button>
            <button type="button" className="btn btn-secondary disabled futuristic-btn">
              Race: {selectedRace}
            </button>
            <button type="button" className="btn btn-primary active futuristic-btn" onClick={() => resetSelection()}>
              Reset 
            </button>
          </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center nft-item" style={{ maxHeight: '600px', overflowY: 'auto' }}>
              <Slide direction='down' duration={1500}>
                <h1 className="h1_head_game set_font">Select Character</h1>
              </Slide>
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

