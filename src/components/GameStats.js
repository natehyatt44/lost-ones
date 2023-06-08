import React, { useState, useEffect } from 'react';
import { Fade } from 'react-awesome-reveal';
import { Storage } from 'aws-amplify';
import Hashpack from '../modals/Hashpack';
import AccountCode from '../components/AccountCode';

import { s3accountStats } from '../constants/Constants';

function GameStats({ handleHashpackConnect, show, handleModalClose, showPopup, setShowPopup, handleAccountCodeSubmit }) {
  const [players, setPlayers] = useState('');
  const [playerElements, setPlayerElements] = useState([]);

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
  
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
  
        playerObj["date"] = new Date(playerObj["date"]); // Convert the date string to a Date object
        
        return playerObj;
      }).filter(player => {
        // Remove any objects with empty or invalid dates
        return Object.keys(player).length > 0 && !isNaN(player.date.getTime());
      });

      players.sort((a, b) => b.date - a.date);
      setPlayers(players);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  }

  useEffect(() => {
    fetchPlayers()
  }, []);
  
  useEffect(() => {
    if (players.length) {
      const elements = players.map((player, index) => {
        const formattedAccountId = player.accountId;
        const formattedStatus = player.status;
        const formattedRace = player.race;
        const formattedDate = formatDate(player.date);
        const playerIsActive = player.isActive === '1' || player.isActive === 1 || player.isActive === true;
        return (
          <li key={index} style={{listStyle: 'none'}}>
            <div className={playerIsActive ? "player-data" : "player-data player-data-inactive"}>
              <span>{formattedAccountId}</span>
              <span>{formattedStatus}</span>
              <span>{formattedRace}</span>
              <span>{formattedDate}</span>
            </div>
          </li>
        );
      });
      setPlayerElements(elements);
    }
  }, [players]);

  const headers = (
    <li style={{listStyle: 'none'}}>
      <div className="player-data">
        <span>Wallet ID</span>
        <span>Achievement</span>
        <span>Race</span>
        <span>Date</span>
      </div>
    </li>
  );

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
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
            <Fade duration={3000}>
              <ul className="players-list">
                {headers}<br/>
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
