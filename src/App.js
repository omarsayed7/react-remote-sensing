import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MapSearch from './components/Map'
import NewMap from './components/newMap'
import { HomePage, AddAreaPage, MapOverlayPage, ContactUsPage } from "./pages"
// import DrawMap from './components/drawMap'
import './App.css';

window.localStorage.clear();
class App extends Component {
  state = {
    incidents: [],
  }
  render() {
    return (
      <Router>
        <Routes >
          <Route path="/" exact element={<HomePage />} />
          <Route path="/add-area" element={<AddAreaPage />} />
          <Route path="/map-overlay" element={<MapOverlayPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />

        </Routes >
      </Router>

    );
  }
}
export default App;