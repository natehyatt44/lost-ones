import React, { useState, useEffect } from 'react';
import { RaceSelectionStage, CharacterSelectionStage, ChapterSelectionStage } from '../components/GameSelections';
import { s3accountActivity, uploadCsv } from '../constants/Constants';
import { CheckAccount } from '../components/GameChecks';

function GameOptions({ accountId, nfts, navigate }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showRaces, setShowRaces] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showCharacters, setShowCharacters] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedRace, setSelectedRace] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [accessibleChapters, setAccessibleChapters] = useState([]);
  const [heldRaces, setHeldRaces] = useState([]);

  // Track window size for responsiveness
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const scrollbarHeight = isMobile ? 450 : 600;

  // Check account to get accessible chapters and held races
  useEffect(() => {
    const fetchGameChecks = async () => {
      const gameChecks = await CheckAccount(accountId, nfts);
      setAccessibleChapters(gameChecks.accessibleChapters);
      setHeldRaces(gameChecks.heldRaces);
    };

    fetchGameChecks();
  }, [accountId, nfts]);

  // Check if race or chapter exists for user
  const checkRaceExists = (race) => heldRaces.includes(race);
  const checkChapterExists = (chapter) => accessibleChapters.includes(chapter);

  // Selection handlers
  const handleCharacterSelect = (index) => setSelectedCharacter(index);
  const handleRaceButtonClick = (race) => {
    setSelectedRace(race);
    setShowRaces(false);
    setShowCharacters(true);
  };
  const handleChapterButtonClick = (chapter) => {
    setSelectedChapter(chapter);
    setShowCharacters(false);
  };
  
  // Reset handlers
  const resetRace = () => {
    setSelectedRace(null);
    setShowRaces(true);
  };
  const resetChapter = () => {
    setSelectedChapter(null);
    setShowCharacters(true);
  };
  
  // Start game handler
  const handleStartGame = (index) => {
    setSelectedImage(index);
    const dateTimeString = new Date().toISOString().replace('T', ' ').slice(0, 19);
    uploadCsv(`accountId|type|nfts|dateTime\n${accountId}|Start-Game|${nfts}|${dateTimeString}`, `${s3accountActivity}/activity-${accountId}-${dateTimeString}.csv`)
    navigate('/game', { state: { selectedImage: index, accountId: accountId, selectedChapter: selectedChapter, selectedRace: selectedRace } });
  };

  // Returning JSX according to different game stages (race selection, character selection, chapter selection)
  return (
    <>
      {/* Race Selection Stage */}
      {showRaces && !showCharacters && (
        <RaceSelectionStage 
          accountId={accountId}
          checkRaceExists={checkRaceExists}
          handleRaceButtonClick={handleRaceButtonClick}
        />
      )}

      {/* Character Selection Stage */}
      {!showRaces && showCharacters && !selectedChapter && (
        <CharacterSelectionStage 
          nfts={nfts}
          handleStartGame={handleStartGame}
          resetRace={resetRace}
          scrollbarHeight={scrollbarHeight}
        />
      )}

      {/* Chapter Selection Stage */}
      {selectedCharacter !== null && (
        <ChapterSelectionStage 
          checkChapterExists={checkChapterExists}
          handleChapterButtonClick={handleChapterButtonClick}
          resetChapter={resetChapter}
        />
      )}
    </>
  );
}

export default GameOptions;
