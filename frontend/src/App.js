import './App.css';
import React, { useEffect } from 'react';
import Home from './pages/home/home';
import { GameFunctions } from './Context/GameContext'
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import About from './pages/about/about';
import Header from './pages/header/header';
import Tutorial from './pages/tutorial/tutorial';

function App() {
  return (

    <div className="App">
      <GameFunctions>
        <Router>
          <Header/>
          <Routes>
            <Route path ="/" Component={Home}/>
            <Route path="/about" Component={About}/>
            <Route path ="/learn" Component={Tutorial}/>
          </Routes>
        </Router>
      </GameFunctions>
    </div>
  );
}

export default App;
