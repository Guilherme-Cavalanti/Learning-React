import './App.css';
import React, { useEffect } from 'react';
import Home from './pages/home/home';
import { GameFunctions } from './Context/GameContext'
import "bootstrap/dist/css/bootstrap.min.css"

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
