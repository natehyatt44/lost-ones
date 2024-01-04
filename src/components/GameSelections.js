import { NFTImages } from '../components/ConnectWallet';
const { Slide, Fade } = require("react-awesome-reveal");


export const RaceSelectionStage = ({ accountId, checkRaceExists, handleRaceButtonClick }) => (
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
          <button 
            type="button" 
            className={`btn ${checkRaceExists("Mortal") ? "btn-primary" : "btn-secondary disabled"} futuristic-btn`}
            disabled={!checkRaceExists("Mortal")}
            onClick={() => checkRaceExists("Mortal") && handleRaceButtonClick("Mortal")}>Mortal</button>
          <button 
            type="button" 
            className={`btn ${checkRaceExists("Gaian") ? "btn-primary" : "btn-secondary disabled"} futuristic-btn`}
            disabled={!checkRaceExists("Gaian")}
            onClick={() => checkRaceExists("Gaian") && handleRaceButtonClick("Gaian")}>Gaian</button>
          <button 
            type="button" 
            className={`btn ${checkRaceExists("Runekin") ? "btn-primary" : "btn-secondary disabled"} futuristic-btn`}
            disabled={!checkRaceExists("Runekin")}
            onClick={() => checkRaceExists("Runekin") && handleRaceButtonClick("Runekin")}>Runekin</button>
          <button 
            type="button" 
            className={`btn ${checkRaceExists("Soulweaver") ? "btn-primary" : "btn-secondary disabled"} futuristic-btn`}
            disabled={!checkRaceExists("Soulweaver")}
            onClick={() => checkRaceExists("Soulweaver") && handleRaceButtonClick("Soulweaver")}>Soulweaver</button>
          <button 
            type="button" 
            className={`btn ${checkRaceExists("Zephyr") ? "btn-primary" : "btn-secondary disabled"} futuristic-btn`}
            disabled={!checkRaceExists("Zephyr")}
            onClick={() => checkRaceExists("Zephyr") && handleRaceButtonClick("Zephyr")}>Zephyr</button>
          <button 
            type="button" 
            className={`btn ${checkRaceExists("ArchAngel") ? "btn-primary" : "btn-secondary disabled"} futuristic-btn`}
            disabled={!checkRaceExists("ArchAngel")}
            onClick={() => checkRaceExists("ArchAngel") && handleRaceButtonClick("ArchAngel")}>ArchAngel</button>
        </div>
      </Slide>
  </>
);

export const CharacterSelectionStage = ({ nfts, resetRace, handleCharacterSelect, scrollbarHeight }) => (
  <>
    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center btn-list-clicked">
      {/* <button type="button" className="btn btn-secondary disabled futuristic-btn-clicked">Race: {selectedRace}</button>
      <button type="button" className="btn btn-secondary disabled futuristic-btn-clicked">Chapter: {selectedChapter}</button> */}
      <button type="button" className="btn btn-primary futuristic-btn" onClick={() => resetRace()}>Back</button>
    </div>
    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center nft-item">
      <Fade duration={5000}>
        <h2 className="h1_head_game set_font">Select Character</h2>
      </Fade>
    </div>
    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center nft-item" style={{ maxHeight: scrollbarHeight, overflowY: 'auto' }}>
      <div className="row nft-container">
        <NFTImages accountNfts={nfts} onClickImage={handleCharacterSelect}/>
      </div>
    </div>  
  </>
);

export const ChapterSelectionStage = ({ handleChapterButtonClick, resetRace, accessibleChapters }) => (
  <>
    <Fade duration={5000}>
    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center btn-list-clicked">
      {/* <button type="button" className="btn btn-secondary disabled futuristic-btn-clicked">Race: {selectedRace}</button>
      <button type="button" className="btn btn-secondary disabled futuristic-btn-clicked">Chapter: {selectedChapter}</button> */}
      <button type="button" className="btn btn-primary futuristic-btn" onClick={() => resetRace()}>Back</button>
    </div>
      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center nft-item">
        <h2 className="h1_head_game set_font">Select Chapter</h2>
      </div>
      </Fade>
      <Slide direction='left' duration={1500}>
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center btn-list">
          {accessibleChapters.map((chapterObj, index) => (
            <button 
              key={index} // add this line
              type="button" 
              className={`btn ${chapterObj.status === 'Complete' ? "btn-success" : chapterObj.status === 'Open' ? "btn-primary" : "btn-secondary"} futuristic-btn`}
              disabled={chapterObj.status === 'Locked'}
              onClick={() => chapterObj.status !== 'Locked' && handleChapterButtonClick(chapterObj.chapter)}>{chapterObj.chapter}
            </button>
          ))}
        </div>
      </Slide>


  </>
);

export const ToolSelectionStage = ({ nfts, resetRace, handleToolButtonClick, scrollbarHeight }) => (
  <>
    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center btn-list-clicked">
      <button type="button" className="btn btn-primary futuristic-btn" onClick={() => resetRace()}>Back</button>
    </div>
    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center nft-item">
      <Fade duration={5000}>
        <h2 className="h1_head_game set_font">Select Tool</h2>
      </Fade>
    </div>
    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center nft-item" style={{ maxHeight: scrollbarHeight, overflowY: 'auto' }}>
      <div className="row nft-container">
        <NFTImages accountNfts={nfts} onClickImage={handleToolButtonClick}/>
      </div>
    </div>  
  </>
);

export const WeaponSelectionStage = ({ nfts, resetRace, handleWeaponButtonClick, scrollbarHeight }) => (
  <>
    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center btn-list-clicked">
      <button type="button" className="btn btn-primary futuristic-btn" onClick={() => resetRace()}>Back</button>
    </div>
    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center nft-item">
      <Fade duration={5000}>
        <h2 className="h1_head_game set_font">Select Weapon</h2>
      </Fade>
    </div>
    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center nft-item" style={{ maxHeight: scrollbarHeight, overflowY: 'auto' }}>
      <div className="row nft-container">
        <NFTImages accountNfts={nfts} onClickImage={handleWeaponButtonClick}/>
      </div>
    </div>  
  </>
);

export const CompanionSelectionStage = ({ nfts, resetRace, handleCompanionButtonClick, scrollbarHeight }) => (
  <>
    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center btn-list-clicked">
      <button type="button" className="btn btn-primary futuristic-btn" onClick={() => resetRace()}>Back</button>
    </div>
    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center nft-item">
      <Fade duration={5000}>
        <h2 className="h1_head_game set_font">Select Companion</h2>
      </Fade>
    </div>
    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center nft-item" style={{ maxHeight: scrollbarHeight, overflowY: 'auto' }}>
      <div className="row nft-container">
        <NFTImages accountNfts={nfts} onClickImage={handleCompanionButtonClick}/>
      </div>
    </div>  
  </>
);

export const LandscapeSelectionStage = ({ nfts, resetRace, handleLandscapeButtonClick, scrollbarHeight }) => (
  <>
    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center btn-list-clicked">
      <button type="button" className="btn btn-primary futuristic-btn" onClick={() => resetRace()}>Back</button>
    </div>
    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center nft-item">
      <Fade duration={5000}>
        <h2 className="h1_head_game set_font">Select Landscape</h2>
      </Fade>
    </div>
    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center nft-item" style={{ maxHeight: scrollbarHeight, overflowY: 'auto' }}>
    <div className="row nft-container">
        <NFTImages accountNfts={nfts} onClickImage={handleLandscapeButtonClick}/>
      </div>
    </div>  
  </>
);

