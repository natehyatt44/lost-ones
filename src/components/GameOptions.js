import React, { useState, useEffect } from 'react';
import { RaceSelectionStage, CharacterSelectionStage, ChapterSelectionStage } from '../components/GameSelections';
import { s3accountActivity, uploadCsv } from '../constants/Constants';
import { CheckRace, CheckChapter } from '../components/GameChecks';

function GameOptions({ accountId, nfts, navigate }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [gameState, setGameState] = useState({
    showRaces: true,
    showCharacters: false,
    showChapter: false,
    selectedImage: null,
    selectedRace: null,
    selectedRaceNfts: [],
    selectedChapter: null,
    windowWidth: window.innerWidth,
    accessibleChapters: [],
    heldRaces: [],
  });

  // Track window size for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setGameState(prevState => ({ ...prevState, windowWidth: window.innerWidth }));
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = gameState.windowWidth < 768;
  const scrollbarHeight = isMobile ? 450 : 600;

  // Check account to get accessible chapters and held races
  useEffect(() => {
    const fetchGameChecks = async () => {
      const raceCheck = await CheckRace(accountId, nfts);
      setGameState(prevState => ({
        ...prevState,
        heldRaces: raceCheck.heldRaces
      }));
    };

    fetchGameChecks();
  }, [accountId, nfts]);

  // Check if race or chapter exists for user
  const checkRaceExists = (race) => gameState.heldRaces.includes(race);
  //const checkChapterExists = (chapter) => gameState.accessibleChapters.includes(chapter);
  
  // Selection handlers
  const handleRaceButtonClick = (race) => {
    let raceFilteredNfts = []

    const nftsObject = JSON.parse(nfts);
    for (const nft of nftsObject.nftMetadata) {
      if (nft.race === race) {
        raceFilteredNfts.push(nft);
      }
    }

    setGameState(prevState => ({
      ...prevState,
      selectedRace: race,
      showRaces: false,
      showCharacters: true,
      selectedRaceNfts: raceFilteredNfts,
    }));
  };

  const handleCharacterSelect = async (index) => {
    const accessibleChapters = await CheckChapter(accountId, gameState.selectedRace);
    console.log(index)
    setGameState(prevState => ({ ...prevState, 
      showRaces: false,
      showCharacters: false,
      showChapter: true,
      selectedImage: index,
      accessibleChapters: accessibleChapters
     }));
  }

  // Start game handler
  const handleChapterButtonClick = (chapter) => {
    const dateTimeString = new Date().toISOString().replace('T', ' ').slice(0, 19);
    uploadCsv(`accountId|type|nfts|dateTime\n${accountId}|Start-Game|${nfts}|${dateTimeString}`, `${s3accountActivity}/activity-${accountId}-${dateTimeString}.csv`);
    navigate('/game', { state: { selectedImage: gameState.selectedImage, accountId: accountId, selectedChapter: chapter, selectedRace: gameState.selectedRace } });
  };

  // Reset handlers
  const resetRace = () => {
    setGameState(prevState => ({
      ...prevState,
      selectedRace: null,
      showCharacters: null,
      showRaces: true,
      showChapter: null,
      selectedRaceNfts: [],
    }));
  };

  

  // Returning JSX according to different game stages (race selection, character selection, chapter selection)
  return (
    <>
      {/* Race Selection Stage */}
      {gameState.showRaces && !gameState.showCharacters && (
        <RaceSelectionStage 
          accountId={accountId}
          checkRaceExists={checkRaceExists}
          handleRaceButtonClick={handleRaceButtonClick}
        />
      )}

      {/* Character Selection Stage */}
      {!gameState.showRaces && gameState.showCharacters && !gameState.selectedChapter && (
        <CharacterSelectionStage 
          nfts={gameState.selectedRaceNfts}
          handleCharacterSelect={handleCharacterSelect}
          resetRace={resetRace}
          scrollbarHeight={scrollbarHeight}
        />
      )}

      {/* Chapter Selection Stage */}
      {!gameState.showRaces && !gameState.showCharacters && gameState.showChapter && (
        <ChapterSelectionStage 
          accessibleChapters={gameState.accessibleChapters}
          handleChapterButtonClick={handleChapterButtonClick}
          resetRace={resetRace}
        />
      )}
    </>
  );
}

export default GameOptions;
