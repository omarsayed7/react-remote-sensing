import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MapSearch from './components/Map'
import NewMap from './components/newMap'
import { HomePage } from "./pages"
import DrawMap from './components/drawMap'
import './App.css';

class App extends Component {
  state = {
    incidents: [],
  }
  render() {
    return (
      <Router>
        <Routes >
          <Route path="/" exact element={<HomePage />} />
          <Route path="/map-view" element={<DrawMap />} />
        </Routes >
      </Router>

    );
  }
}
export default App;