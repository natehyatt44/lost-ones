import React, { useState, useEffect } from 'react';
import { Fade } from 'react-awesome-reveal';
import { Storage } from 'aws-amplify';
import Hashpack from '../modals/Hashpack';
import AccountCode from '../components/AccountCode';

import { s3accountStats } from '../constants/Constants';

function GameStats({ handleHashpackConnect, show, handleModalClose, showPopup, setShowPopup, handleAccountCodeSubmit }) {
  const [playerAccounts, setPlayerAccounts] = useState([]);
  const [playerElements, setPlayerElements] = useState([]);
  const [viewingPlayerId, setViewingPlayerId] = useState(null);

  // Function to format the date
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
  
  // Function to fetch player data and process it
  async function fetchPlayers() {
    try {
      // Fetch data from AWS S3 storage
      const signedUrl = await Storage.get(`${s3accountStats}/accounts.csv`, { level: "public" });
      const response = await fetch(signedUrl);
      const textContent = await response.text();
  
      const rows = textContent.trim().split("\n");
      const header = rows.shift().split("|");
  
      // Map rows to player objects
      const players = rows.map((row) => {
        const rowData = row.split("|");
        const playerObj = {};
        header.forEach((key, index) => {
          playerObj[key] = rowData[index];
        });
  
        playerObj["date"] = new Date(playerObj["date"]); // Convert the date string to a Date object

        playerObj["chapterPoints"] = calculateChapterPoints(playerObj); // Calculate chapter points.

        return playerObj;
      });

      // Aggregate players at account level.
      const playerAccounts = players.reduce((acc, player) => {
        const index = acc.findIndex(accPlayer => accPlayer.accountId === player.accountId);
        if (index > -1) {
          // Only add chapter points if the chapter hasn't been completed before
          if (!acc[index].completedChapters.includes(player.status)) {
            acc[index].chapterPoints += calculateChapterPoints(player);
            acc[index].completedChapters.push(player.status);
          }
          acc[index].playerDetails.push(player);
        } else {
          acc.push({ 
            accountId: player.accountId, 
            chapterPoints: calculateChapterPoints(player),
            completedChapters: [player.status], 
            playerDetails: [player] 
          });
        }

        return acc;
      }, []);

      // Sort player accounts by chapter points.
      playerAccounts.sort((a, b) => b.chapterPoints - a.chapterPoints);

      setPlayerAccounts(playerAccounts);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  }

  useEffect(() => {
    fetchPlayers()
  }, []);

  // Function to calculate chapter points
  function calculateChapterPoints(player) {
    let points = 0;
    if (player.status === 'Chapter 1-1 Completed' || player.status === 'Chapter 1-2 Completed') {
      points = points + 1;
    }
    if (player.status === 'Chapter 2 Completed') {
      points = points + 2;
    }
    if (player.status === 'Chapter 3 Completed') {
      points = points + 3;
    }
    if (player.status === 'Chapter 4 Completed') {
      points = points + 4;
    }
    if (player.status === 'Chapter 5 Completed') {
      points = points + 5;
    }

    return points;
  }
  
  useEffect(() => {
    if (playerAccounts.length) {
      const elements = playerAccounts.map((playerAccount, index) => {
        return (
          <div key={index}>
            <div 
              className="player-data" 
              onClick={() => viewingPlayerId === playerAccount.accountId ? setViewingPlayerId(null) : setViewingPlayerId(playerAccount.accountId)}
            >
              <span>{playerAccount.accountId}</span>
              <span>{playerAccount.chapterPoints}</span>
            </div>
            {/* Conditionally render the additional details if this player is being viewed. */}
            {viewingPlayerId === playerAccount.accountId && (
              <div className="player-details"> <br/>
                {playerAccount.playerDetails.map((playerDetail, detailIndex) => (

                  <div key={detailIndex} className="player-detail-row">
                    <span>{playerDetail.race}</span>
                    <span>{playerDetail.status}</span>
                  </div>
                ))}
                <br/>
              </div> 
            )}
          </div>
        );
      });
      setPlayerElements(elements);
    }
  }, [playerAccounts, viewingPlayerId]);
  

  // Return the complete component
  return (
    <>
      <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center p-0 prologue-item">
            <Hashpack onConnect={handleHashpackConnect} showModal={show} onClose={handleModalClose} />
            <AccountCode showPopup={showPopup} setShowPopup={setShowPopup} onAccountCodeSubmit={handleAccountCodeSubmit} />
          </div>
      </div>
      <div className='player-container'>
        <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
          <Fade duration={8000}>
            <h3 className="h1_heading set_font">The Lost Ones</h3>
          </Fade>
        </div>
        </div>
        <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center pop-out">
            <Fade duration={3000}>
            <div className="player-headers">
                <span>Wallet ID</span>
                <span>Chapter Points</span>
            </div>
            <ul className="players-list">
                {playerElements}
            </ul>
            </Fade>
          </div>
        </div>
      </div>
    </>
  );
}

export default GameStats;
