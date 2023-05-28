import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Hashpack from '../modals/Hashpack';
import { Storage } from 'aws-amplify';
import { Dropdown } from 'react-bootstrap';
import AccountCode from '../components/AccountCode';
import { NFTImages } from '../components/ConnectWallet';
import { s3accountActivity, s3accountStats } from '../constants/Constants';
const { Slide, Fade } = require("react-awesome-reveal");

const regex = /^0\.0\..*/;

async function uploadCsv(textData, fileName) {
  const csvBlob = new Blob([textData], { type: 'text/csv' });
  await Storage.put(fileName, csvBlob, {
    contentType: 'text/csv'
  });
  console.log('File uploaded successfully!');
}

function Play() {
  const [accountId, setAccountId] = useState('')
  const [nfts, setNfts] = useState([])
  const [nftAmt, setNftAmt] = useState([])
  const [showRaces, setShowRaces] = useState(false);
  const [showBarbarians, setShowBarbarians] = useState(false);
  const [show, setShow] = useState(false);
  const [stats, setStats] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [players, setPlayers] = useState('');
  const [playerElements, setPlayerElements] = useState([]);
  const navigate = useNavigate();

  function handleChapterButtonClick() {
    setShowRaces(true);
    const dateTimeString = new Date().toISOString().replace('T', ' ').slice(0, 19);
      uploadCsv(`accountId|type|nfts|dateTime\n${accountId}|Select-Chapter|${nfts}|${dateTimeString}`, `${s3accountActivity}/activity-${accountId}-${dateTimeString}.csv`)
      .then(() => {
        console.log('CSV file uploaded successfully!');
      })
      .catch((error) => {
        console.error('Error uploading CSV file:', error);
      });
  }

  function handleRaceButtonClick() {
    setShowBarbarians(true);
    const dateTimeString = new Date().toISOString().replace('T', ' ').slice(0, 19);
      uploadCsv(`accountId|type|nfts|dateTime\n${accountId}|Select-Race|${nfts}|${dateTimeString}`, `${s3accountActivity}/activity-${accountId}-${dateTimeString}.csv`)
      .then(() => {
        console.log('CSV file uploaded successfully!');
      })
      .catch((error) => {
        console.error('Error uploading CSV file:', error);
      });
  }

  function handleStartGame(index) {
    setSelectedImage(index)
    console.log(index)
    const dateTimeString = new Date().toISOString().replace('T', ' ').slice(0, 19);
    uploadCsv(`accountId|type|nfts|dateTime\n${accountId}|Select-NFT|${nfts}|${dateTimeString}`, `${s3accountActivity}/activity-${accountId}-${dateTimeString}.csv`)
    navigate('/game', {state:{selectedImage: index, accountId: accountId}});
  }

  const handleHashpackConnect = (accountId, nfts) => {
    setAccountId(accountId);
    window.localStorage.setItem('accountId', accountId);

    setNfts(nfts);
    window.localStorage.setItem('nfts', nfts);

    const jsonObj = JSON.parse(nfts);
    setNftAmt(jsonObj.nftMetadata.length);
    window.localStorage.setItem('nftAmt', jsonObj.nftMetadata.length);

    if (regex.test(accountId)){
      const dateTimeString = new Date().toISOString().replace('T', ' ').slice(0, 19);
      uploadCsv(`accountId|type|nfts|dateTime\n${accountId}|Connect-Hashpack|${nfts}|${dateTimeString}`, `${s3accountActivity}/activity-${accountId}-${dateTimeString}.csv`)
    }
  };

  const handleAccountCodeSubmit = (accountId, nfts) => {
    setAccountId(accountId);
    setNfts(nfts);
    const jsonObj = JSON.parse(nfts);
    setNftAmt(jsonObj.nftMetadata.length);

    if (regex.test(accountId)){
      const dateTimeString = new Date().toISOString().replace('T', ' ').slice(0, 19);
      uploadCsv(`accountId|type|nfts|dateTime\n${accountId}|Use-AccountCode|${nfts}|${dateTimeString}`, `${s3accountActivity}/activity-${accountId}-${dateTimeString}.csv`)
    }
  }
  

  const handleExit = () => {
    window.location.href = '/';
  };

  const handleShow = () => {
    if (accountId) {
      console.log(accountId)
      setStats(false);
    } else {
      setShow(true);
    }
  }
  const handleStats = () => setStats(true);
  const handleModalClose = () => {setShow(false);};
  const handleTogglePopup = () => {
    setShowPopup(!showPopup);
  };
  const disconnectHashpack = () => {
    setAccountId(null);
    // You might also want to remove the accountId from local storage
    window.localStorage.removeItem('accountId');
    setStats(true);
  }

  const checkRaceExists = (race) => {
    // const jsonObj = JSON.parse(nfts);
    // const { nftMetadata } = jsonObj;
  
    // return nftMetadata.some(({ traits }) => {
    //   return traits.some(({ trait_type, value }) => trait_type === "Race" && value === race);
    // });

  };

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

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
  
  useEffect(() => {
    const storedAccountId = window.localStorage.getItem('accountId');
    const storedNfts = window.localStorage.getItem('nfts');
    const storedNftAmt = window.localStorage.getItem('nftAmt');

    if (storedAccountId) {
      setAccountId(storedAccountId);
      setNfts(storedNfts)
      setNftAmt(storedNftAmt)
      console.log(accountId)
      console.log(storedNfts)
      console.log(storedNftAmt)
    }
    fetchPlayers()

  }, []);
  
  useEffect(() => {
    if (players.length) {
      const elements = players.map((player, index) => {
        const formattedAccountId = player.accountId;
        const formattedStatus = player.status;
        const formattedRace = player.race;
        const formattedDate = formatDate(player.date);
        return (
          <li key={index} style={{listStyle: 'none'}}>
            <div className="player-data">
              <span>{formattedAccountId}</span>
              <span>{formattedStatus}</span>
              <span>{formattedRace}</span>
              {/* <span>{formattedDate}</span> */}
            </div>
          </li>
        );
      });
      setPlayerElements(elements);
    }
  }, [players]);

  return (
   <> 
   <section id="Play " className="background_play ">
   <div className="nft-container ">
    <div className="row">
      <div className="col-4 col-sm-4 col-md-4 col-lg-3 col-xl-1 text-center nft-item">
        <Dropdown>
          <Dropdown.Toggle variant="primary" size="lg" id="dropdown-basic" style={{ backgroundColor: '#1a1a1a', borderColor: '#1a1a1a', color: '#fff' }}>
            Menu
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ backgroundColor: '#1a1a1a', borderColor: '#1a1a1a' }}>
            <Dropdown.Item onClick={handleShow} style={{ color: '#fff' }}>
              {accountId ? "Play" : "Connect Hashpack"}
            </Dropdown.Item>  
            {accountId && (
              <Dropdown.Item onClick={disconnectHashpack} style={{ color: '#fff' }}>
                Disconnect Hashpack
              </Dropdown.Item>
            )}
            {/* <Dropdown.Item onClick={handleTogglePopup} style={{ color: '#fff' }}>Use Account Code</Dropdown.Item> */}
            <Dropdown.Item onClick={handleStats} style={{ color: '#fff' }}>Stats</Dropdown.Item>
            <Dropdown.Item onClick={() => window.location.href = 'https://hbarbarians.gitbook.io/hbarbarians/the-lost-ones/guide'} style={{ color: '#fff' }}>Guide</Dropdown.Item>
            <Dropdown.Item onClick={() => window.location.href = 'https://hbarbarians.gitbook.io/hbarbarians/the-lost-ones/prologue'} style={{ color: '#fff' }}>Prologue</Dropdown.Item>
            <Dropdown.Item onClick={() => window.location.href = 'https://hbarbarians.gitbook.io/hbarbarians/the-lost-ones/lore'} style={{ color: '#fff' }}>Lore</Dropdown.Item>
            <Dropdown.Item onClick={handleExit} style={{ color: '#fff' }}>Exit</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
   {stats === true && 
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
            <ul className="players-list">{playerElements}</ul>
          </Fade>
        </div>
      </div>
    </div>
  </>
  }
    {regex.test(accountId) && nftAmt > 0 && stats === false &&( 
      <>
        <Fade duration={3000}>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center nft-item">
            <h3 className="h1_head_xs set_font">Welcome #{accountId}</h3>
          </div>
        </Fade>
        <Fade duration={8000}>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center nft-item">
            <h2 className="h1_head_game set_font">Select Chapter</h2>
          </div>
          </Fade>
        <Slide direction='left' duration={3500}>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center btn-list">
            <button type="button" variant="dark" className="btn btn-primary active futuristic-btn" onClick={handleChapterButtonClick}>Chapter 1</button>
            <button type="button" className={`btn ${checkRaceExists("Gaian") ? "btn-primary" : "btn-secondary disabled"} futuristic-btn`}>Chapter 2</button>
            <button type="button" className={`btn ${checkRaceExists("Elven") ? "btn-primary" : "btn-secondary disabled"} futuristic-btn`}>Chapter 3</button>
            <button type="button" className={`btn ${checkRaceExists("ArchAngel") ? "btn-primary" : "btn-secondary disabled"} futuristic-btn`}>Chapter 4</button>
          </div>
        </Slide>
        {/* {showRaces && ( */}
        <Fade duration={10000}>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center nft-item">
            <h2 className="h1_head_game set_font">Select Race</h2>
          </div>
          </Fade>
        <Slide direction='right' duration={3500}>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center btn-list">
            <button type="button" variant="dark" className="btn btn-primary active futuristic-btn" onClick={handleRaceButtonClick}>Mortal</button>
            <button type="button" className={`btn ${checkRaceExists("Gaian") ? "btn-primary" : "btn-secondary disabled"} futuristic-btn`}>Gaian</button>
            <button type="button" className={`btn ${checkRaceExists("Elven") ? "btn-primary" : "btn-secondary disabled"} futuristic-btn`}>Elven</button>
            <button type="button" className={`btn ${checkRaceExists("ArchAngel") ? "btn-primary" : "btn-secondary disabled"} futuristic-btn`}>ArchAngel</button>
            <button type="button" className={`btn ${checkRaceExists("Specter") ? "btn-primary" : "btn-secondary disabled"} futuristic-btn`}>Specter</button>
            <button type="button" className={`btn ${checkRaceExists("Avem") ? "btn-primary" : "btn-secondary disabled"} futuristic-btn`}>Avem</button>
          </div>
        </Slide>
        {showBarbarians && (
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center nft-item" style={{ maxHeight: '500px', overflowY: 'auto' }}>
            <Slide direction='up' duration={1500}>
              <h1 className="h1_head_game set_font">Select Character</h1>
            </Slide>
            <div className="row">
              <NFTImages accountNfts={nfts} onClickImage={(index) => handleStartGame(index)}/>
            </div>
          </div>
       )} 
      </>
    )}
    {
    regex.test(accountId) && nftAmt === 0 && stats === false &&
    <>
      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center wallet">
        <Fade duration={5000}>
        <h1 className="h1_head_m set_font">You do not have the required NFT's</h1>
        <h3 className="h1_head_xs set_font">Please navigate to the Guide for more Information</h3>
        </Fade>
        <Hashpack onConnect={handleHashpackConnect} showModal={show} onClose={handleModalClose} />
        {/* <AccountCode showPopup={showPopup} setShowPopup={setShowPopup} onAccountCodeSubmit={handleAccountCodeSubmit} /> */}
      </div>
    </>
  }
    </div>
    </section>
	</>
  );
};

export default Play;
