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

  // Function to calculate chapter points
  function calculateChapterPoints(playerDetails) {
    if (!Array.isArray(playerDetails)) {
      if (typeof playerDetails === 'object') {
        playerDetails = [playerDetails];
      } else {
        console.error("calculateChapterPoints: playerDetails is not an array", playerDetails);
        return 0;
      }
    }
    let points = 0;
    const completedChapters = new Set();
  
    playerDetails.forEach(player => {
      if (player.status === 'Chapter 1-1 Completed' || player.status === 'Chapter 1-2 Completed') {
        completedChapters.add(player.status);
      } else if (['Chapter 2 Completed', 'Chapter 3 Completed', 'Chapter 4 Completed'].includes(player.status)) {
        const raceChapterKey = `${player.race}-${player.status}`;
        completedChapters.add(raceChapterKey);
      }
    });
  
    completedChapters.forEach(chapter => {
      if (chapter.includes('Chapter 1')) {
        points += 1;
      } else if (chapter.includes('Chapter 2')) {
        points += 2;
      } else if (chapter.includes('Chapter 3')) {
        points += 3;
      } else if (chapter.includes('Chapter 4')) {
        points += 4;
      }
    });
  
    return points;
  }

  // Function to fetch player data and process it
  async function fetchPlayers() {
    try {
      const signedUrl = await Storage.get(`${s3accountStats}/accounts.csv`, { level: "public" });
      const response = await fetch(signedUrl);
      const textContent = await response.text();
  
      const rows = textContent.trim().split("\n");
      const header = rows.shift().split("|");

      const players = rows.map((row) => {
        const rowData = row.split("|");
        const playerObj = {};
        header.forEach((key, index) => {
          playerObj[key] = rowData[index];
        });
  
        playerObj["date"] = new Date(playerObj["date"]);

        return playerObj;
      });

      const playerAccounts = players.reduce((acc, player) => {
        const index = acc.findIndex(accPlayer => accPlayer.accountId === player.accountId);
        if (index > -1) {
          acc[index].playerDetails.push(player);
          acc[index].chapterPoints = calculateChapterPoints(acc[index].playerDetails);
        } else {
          acc.push({ 
            accountId: player.accountId, 
            chapterPoints: calculateChapterPoints([player]),
            completedChapters: [player.status], 
            playerDetails: [player]
          });
        }
        return acc;
      }, []);

      // Sort player accounts by chapter points, then by min date
      playerAccounts.sort((a, b) => {
        // First, compare by chapter points
        if (b.chapterPoints !== a.chapterPoints) {
          return b.chapterPoints - a.chapterPoints;
        }

        // If chapter points are equal, compare by the earliest date
        const minDateA = Math.min(...a.playerDetails.map(p => p.date));
        const minDateB = Math.min(...b.playerDetails.map(p => p.date));
        return minDateA - minDateB;
      });

      setPlayerAccounts(playerAccounts);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  }

  useEffect(() => {
    fetchPlayers();
  }, []);

  useEffect(() => {
    if (playerAccounts.length) {
      const elements = playerAccounts.map((playerAccount, index) => (
        <div key={index}>
          <div 
            className="player-data" 
            onClick={() => setViewingPlayerId(viewingPlayerId === playerAccount.accountId ? null : playerAccount.accountId)}
          >
            <span>{playerAccount.accountId}</span>
            <span>{playerAccount.chapterPoints}</span>
          </div>
          {viewingPlayerId === playerAccount.accountId && (
            <div className="player-details">
              <br />
              {playerAccount.playerDetails.map((playerDetail, detailIndex) => (
                <div key={detailIndex} className="player-detail-row">
                  <span>{playerDetail.race}</span>
                  <span>{playerDetail.status}</span>
                </div>
              ))}
              <br />
            </div> 
          )}
        </div>
      ));
      setPlayerElements(elements);
    }
  }, [playerAccounts, viewingPlayerId]);

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
