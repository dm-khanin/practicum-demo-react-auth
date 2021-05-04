import React from 'react';
import NavBar from './NavBar.js';
import DuckList from './DuckList.js';

function Ducks({ onLogout }) {
  return (
    <>
      <NavBar onLogout={onLogout}/>
      <DuckList/>
    </>
  );
}

export default Ducks;
