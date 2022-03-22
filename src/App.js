import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage, AddAreaPage, MapOverlayPage } from "./pages"
// import DrawMap from './components/drawMap'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    localStorage.clear();
  }
  render() {
    return (
      <Router>
        <Routes >
          <Route path="/" exact element={<HomePage />} />
          <Route path="/add-area" element={<AddAreaPage />} />
          <Route path="/map-overlay" element={<MapOverlayPage />} />

        </Routes >
      </Router>

    );
  }
}
export default App;