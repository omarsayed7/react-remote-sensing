import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MapSearch from './components/Map'
import NewMap from './components/newMap'
import { HomePage, AddAreaPage, MapOverlayPage, ContactUsPage, SignInPage, SignUpPage, HelpPage, LandingPage } from "./pages"
// import DrawMap from './components/drawMap'
import './App.css';

window.localStorage.clear();
class App extends Component {
  constructor(props) {
    super(props);
    localStorage.clear();
  }
  render() {
    return (
      <Router>
        <Routes >
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/home" exact element={<HomePage />} />
          <Route path="/add-area" element={<AddAreaPage />} />
          <Route path="/map-overlay" element={<MapOverlayPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/sign-in-page" element={<SignInPage />} />
          <Route path="/sign-up-page" element={<SignUpPage />} />
          <Route path="/help-page" element={<HelpPage />} />


        </Routes >
      </Router>

    );
  }
}
export default App;