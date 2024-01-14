import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import Home from './pages/home/home';
import Filter from './components/filter/filter';
import { GameFunctions } from './Context/GameContext'


function App() {
  return (

    <div className="App">
      <GameFunctions>
        <Home />
      </GameFunctions>
    </div>
  );
}

export default App;
