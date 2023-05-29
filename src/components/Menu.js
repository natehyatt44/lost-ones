// Menu.js
import React from 'react';
import { Dropdown } from 'react-bootstrap';

/**
 * Menu component
 *
 * @param {Object} props Component props
 * @param {Function} props.handleShow Function to handle the show event
 * @param {string|null} props.accountId Account ID
 * @param {Function} props.disconnectHashpack Function to disconnect hashpack
 * @param {Function} props.handleStats Function to handle stats
 * @param {Function} props.handleExit Function to handle exit
 */
const Menu = ({ handleShow, accountId, disconnectHashpack, handleStats, handleExit }) => (
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
      <Dropdown.Item onClick={handleStats} style={{ color: '#fff' }}>Stats</Dropdown.Item>
      <Dropdown.Item onClick={() => window.location.href = 'https://hbarbarians.gitbook.io/hbarbarians/the-lost-ones/guide'} style={{ color: '#fff' }}>Guide</Dropdown.Item>
      <Dropdown.Item onClick={() => window.location.href = 'https://hbarbarians.gitbook.io/hbarbarians/the-lost-ones/prologue'} style={{ color: '#fff' }}>Prologue</Dropdown.Item>
      <Dropdown.Item onClick={() => window.location.href = 'https://hbarbarians.gitbook.io/hbarbarians/the-lost-ones/lore'} style={{ color: '#fff' }}>Lore</Dropdown.Item>
      <Dropdown.Item onClick={handleExit} style={{ color: '#fff' }}>Exit</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export default Menu;
