import React, { useState, useEffect } from 'react';
import { RaceSelectionStage, 
         CharacterSelectionStage, 
         ChapterSelectionStage,
         ToolSelectionStage,
         WeaponSelectionStage,
         CompanionSelectionStage,
         LandscapeSelectionStage } from '../components/GameSelections';
import { s3accountActivity, uploadCsv } from '../constants/Constants';
import { CheckRace, CheckChapter } from '../components/GameChecks';
import { s3accountStats } from '../constants/Constants';
import { Storage } from 'aws-amplify';

function GameOptions({ accountId, nfts, navigate, onRaceSelect }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [gameState, setGameState] = useState({
    accessibleChapters: [],
    heldRaces: [],
    showRaces: true,
    showCharacters: false,
    showChapter: false,
    showTools: false,
    showWeapons: false,
    showCompanions: false,
    showLandscapes: false,
    selectedRace: null,
    selectedCharacter: null,
    selectedChapter: null,
    selectedTool: null,
    selectedWeapon: null,
    selectedCompanion: null,
    selectedLandscape: null,
    selectedRaceNfts: [],
    selectedToolNfts: [],
    selectedWeaponNfts: [],
    selectedCompanionNfts: [],
    selectedLandscapeNfts: [],
    windowWidth: window.innerWidth,
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

    onRaceSelect(race);

    setGameState(prevState => ({
      ...prevState,
      selectedRace: race,
      showRaces: false,
      showCharacters: true,
      selectedRaceNfts: raceFilteredNfts,
    }));
  };

  const handleCharacterSelect = async (nft, imageUrl) => {
    const accessibleChapters = await CheckChapter(accountId, gameState.selectedRace);

    setGameState(prevState => ({ ...prevState, 
      showRaces: false,
      showCharacters: false,
      showChapter: true,
      selectedCharacter: imageUrl,
      accessibleChapters: accessibleChapters
     }));
  }

  // handle Chapter Button Click
  const handleChapterButtonClick = (chapter) => {
    if (chapter === "Chapter 1-1" || chapter === "Chapter 1-2")
    {
      const dateTimeString = new Date().toISOString().replace('T', ' ').slice(0, 19);
      uploadCsv(`accountId|type|nfts|dateTime\n${accountId}|Start-Game|${nfts}|${dateTimeString}`, `${s3accountActivity}/activity-${accountId}-${dateTimeString}.csv`);
      navigate('/game', { state: { selectedCharacter: gameState.selectedCharacter, accountId: accountId, selectedChapter: chapter, selectedRace: gameState.selectedRace } });
    }
    if (chapter === "Chapter 2")
    {
      let tools = []

      const nftsObject = JSON.parse(nfts);
      console.log(nftsObject)
      for (const nft of nftsObject.nftMetadata) {
        if (nft.type === "Tool") {
          tools.push(nft);
        }
      }
      console.log(tools)
      setGameState(prevState => ({
        ...prevState,
        showRaces: false,
        showCharacters: false,
        showChapter: false,
        showTools: true,
        selectedChapter: chapter,
        selectedToolNfts: tools
      }));
    }
    if (chapter === "Chapter 3")
    {
      let weapons = []

      const nftsObject = JSON.parse(nfts);
      console.log(nftsObject)
      for (const nft of nftsObject.nftMetadata) {
        if (nft.type === "Weapon") {
          weapons.push(nft);
        }
      }
      console.log(weapons)
      setGameState(prevState => ({
        ...prevState,
        showRaces: false,
        showCharacters: false,
        showChapter: false,
        showTools: false,
        showWeapons: true,
        selectedChapter: chapter,
        selectedWeaponNfts: weapons
      }));
    }
    if (chapter === "Chapter 4")
    {
      let companions = []

      const nftsObject = JSON.parse(nfts);
      for (const nft of nftsObject.nftMetadata) {
        if (nft.type === "Companion") {
          companions.push(nft);
        }
      }

      setGameState(prevState => ({
        ...prevState,
        showRaces: false,
        showCharacters: false,
        showChapter: false,
        showTools: false,
        showWeapons: false,
        showCompanions: true,
        selectedChapter: chapter,
        selectedCompanionNfts: companions
      }));
    }
    if (chapter === "Chapter 5")
    {
      let landscapes = []

      const nftsObject = JSON.parse(nfts);
      for (const nft of nftsObject.nftMetadata) {
        if (nft.type === "Landscape") {
          landscapes.push(nft);
        }
      }

      setGameState(prevState => ({
        ...prevState,
        showRaces: false,
        showCharacters: false,
        showChapter: false,
        showTools: false,
        showWeapons: false,
        showCompanions: false,
        showLandscapes: true,
        selectedChapter: chapter,
        selectedLandscapeNfts: landscapes
      }));
    }
  };

  const handleToolButtonClick = async (nft, imageUrl) => {
    setGameState(prevState => ({
      ...prevState,
      selectedTool: imageUrl
    }));

    let chapterPass = 0
    if (nft.forRace === gameState.selectedRace) {chapterPass = 1}
    console.log(nft.forRace, gameState.selectedRace)

    const dateTimeString = new Date().toISOString().replace('T', ' ').slice(0, 19);
    uploadCsv(`accountId|type|nfts|dateTime\n${accountId}|Start-Game|${nfts}|${dateTimeString}`, `${s3accountActivity}/activity-${accountId}-${dateTimeString}.csv`);
    navigate('/game', { state: {  accountId: accountId, 
                                  selectedRace: gameState.selectedRace, 
                                  selectedCharacter: gameState.selectedCharacter, 
                                  selectedChapter: gameState.selectedChapter, 
                                  selectedTool: imageUrl,
                                  chapterPass: chapterPass } });
  };

  const handleWeaponButtonClick = async (nft, imageUrl) => {
    setGameState(prevState => ({
      ...prevState,
      selectedWeapon: imageUrl
    }));

    let chapterPass = 0
    let path = nft.path
    if (nft.forRace === gameState.selectedRace) {chapterPass = 1}
    console.log(nft.forRace, gameState.selectedRace)

    const dateTimeString = new Date().toISOString().replace('T', ' ').slice(0, 19);
    uploadCsv(`accountId|type|nfts|dateTime\n${accountId}|Start-Game|${nfts}|${dateTimeString}`, `${s3accountActivity}/activity-${accountId}-${dateTimeString}.csv`);
    navigate('/game', { state: { accountId: accountId, 
                                 selectedRace: gameState.selectedRace, 
                                 selectedCharacter: gameState.selectedCharacter, 
                                 selectedChapter: gameState.selectedChapter, 
                                 selectedTool: gameState.selectedTool,    
                                 selectedWeapon: imageUrl,
                                 chapterPass: chapterPass,
                                 path: path } });
  };

  const handleCompanionButtonClick = async (nft, imageUrl) => {
    setGameState(prevState => ({
      ...prevState,
      selectedCompanion: imageUrl
    }));

    let chapterPass = 0
    let path = nft.path
    const signedUrl = await Storage.get(`${s3accountStats}/accounts.csv`, { level: "public" });
    const response = await fetch(signedUrl);
    const textContent = await response.text();

    const rows = textContent.trim().split("\n");
    const header = rows.shift().split("|");

    // filter rows based on accountId
    const filteredRows = rows.filter(row => {
      const rowItems = row.split("|");
      return rowItems[0] === accountId;
    });

    console.log(filteredRows)

    const racePaths = {};

    // Iterate over each row and extract relevant information
    filteredRows.forEach(row => {
        const [accountId, achievement, race, count, timestamp] = row.split('|');
    
        // Check if the achievement is part of Chapter 3A or 3B
        if (achievement.includes('Chapter 3A') || achievement.includes('Chapter 3B')) {
            const path = achievement.includes('Chapter 3A') ? 'A' : 'B';
    
            // If the race is already in the object, append the path if it's not already included
            if (racePaths[race]) {
                if (!racePaths[race].includes(path)) {
                    racePaths[race].push(path);
                }
            } else {
                // If the race is not in the object, add it with the current path
                racePaths[race] = [path];
            }
        }
    });
    
    // Log the result or return it from a function
    console.log(racePaths);

    // Condition 1: Check if the NFT is for the selected race
    // Condition 2: Check if the racePaths object contains the selected race
    // Condition 3: Check if the array of paths for the selected race contains the NFT's path
    if (nft.forRace === gameState.selectedRace && 
      racePaths[nft.forRace] && 
      racePaths[nft.forRace].includes(nft.path)) {
      chapterPass = 1; // Set chapterPass to 1 if all conditions are met
    }
    if (nft.forRace === gameState.selectedRace) {chapterPass = 1}
    console.log(nft.forRace, gameState.selectedRace)

    const dateTimeString = new Date().toISOString().replace('T', ' ').slice(0, 19);
    uploadCsv(`accountId|type|nfts|dateTime\n${accountId}|Start-Game|${nfts}|${dateTimeString}`, `${s3accountActivity}/activity-${accountId}-${dateTimeString}.csv`);
    navigate('/game', { state: { accountId: accountId, 
                                 selectedRace: gameState.selectedRace, 
                                 selectedCharacter: gameState.selectedCharacter, 
                                 selectedChapter: gameState.selectedChapter, 
                                 selectedTool: gameState.selectedTool,
                                 selectedWeapon: gameState.selectedWeapon,
                                 selectedCompanion: imageUrl,
                                 chapterPass: chapterPass,
                                 path: path } });
  };

  const handleLandscapeButtonClick = async (nft, imageUrl) => {
    setGameState(prevState => ({
      ...prevState,
      selectedLandscape: imageUrl
    }));

    let chapterPass = 0
    if (nft.forRace === gameState.selectedRace) {chapterPass = 1}
    console.log(nft.forRace, gameState.selectedRace)

    const dateTimeString = new Date().toISOString().replace('T', ' ').slice(0, 19);
    uploadCsv(`accountId|type|nfts|dateTime\n${accountId}|Start-Game|${nfts}|${dateTimeString}`, `${s3accountActivity}/activity-${accountId}-${dateTimeString}.csv`);
    navigate('/game', { state: { accountId: accountId, 
                                 selectedRace: gameState.selectedRace, 
                                 selectedCharacter: gameState.selectedCharacter, 
                                 selectedChapter: gameState.selectedChapter, 
                                 selectedTool: gameState.selectedTool,
                                 selectedWeapon: gameState.selectedWeapon,
                                 selectedCompanion: gameState.selectedCompanion,
                                 selectedLandscape: gameState.selectedLandscape,
                                 chapterPass: chapterPass } });
  };

  // Reset handlers
  const resetRace = () => {
    setGameState(prevState => ({
      ...prevState,
      showRaces: true,
      showCharacters: false,
      showChapter: false,
      showTools: false,
      showWeapons: false,
      showCompanions: false,
      showLandscapes: false,
      selectedRace: null,
      selectedCharacter: null,
      selectedChapter: null,
      selectedTool: null,
      selectedWeapon: null,
      selectedCompanion: null,
      selectedLandscape: null,
      selectedRaceNfts: [],
      selectedToolNfts: [],
      selectedWeaponNfts: [],
      selectedCompanionNfts: [],
      selectedLandscapeNfts: [],
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

      {/* Tool Selection Stage */}
      {!gameState.showRaces && !gameState.showCharacters && !gameState.showChapter && gameState.showTools && (
        <ToolSelectionStage 
          nfts={gameState.selectedToolNfts}
          handleToolButtonClick={handleToolButtonClick}
          resetRace={resetRace}
          scrollbarHeight={scrollbarHeight}
        />
      )}

      {/* Weapon Selection Stage */}
      {!gameState.showRaces && !gameState.showCharacters && !gameState.showChapter && !gameState.showTools && gameState.showWeapons && (
        <WeaponSelectionStage 
          nfts={gameState.selectedWeaponNfts}
          handleWeaponButtonClick={handleWeaponButtonClick}
          resetRace={resetRace}
          scrollbarHeight={scrollbarHeight}
        />
      )}

      {/* Companion Selection Stage */}
      {!gameState.showRaces && !gameState.showCharacters && !gameState.showChapter && !gameState.showTools && !gameState.showWeapons && gameState.showCompanions && (
        <CompanionSelectionStage 
          nfts={gameState.selectedCompanionNfts}
          handleCompanionButtonClick={handleCompanionButtonClick}
          resetRace={resetRace}
          scrollbarHeight={scrollbarHeight}
        />
      )}

      {/* Landscape Selection Stage */}
      {!gameState.showRaces && !gameState.showCharacters && !gameState.showChapter && !gameState.showTools && !gameState.showWeapons && !gameState.showCompanions && gameState.showLandscapes && (
        <LandscapeSelectionStage 
          nfts={gameState.selectedLandscapeNfts}
          handleLandscapeButtonClick={handleLandscapeButtonClick}
          resetRace={resetRace}
          scrollbarHeight={scrollbarHeight}
        />
      )}
    </>
  );
}

export default GameOptions;
