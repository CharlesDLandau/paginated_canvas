import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Grid from '@material-ui/core/Grid';

import View from "./Components/View.js"

class App extends Component {


  render() {
    var imgFolder = require.context("./assets/img/",
        false, /\.(png|jpe?g|svg)$/)
    imgFolder = imgFolder.keys().map(imgFolder)
    return (
      <Router>
      <div className="App-header">
      <Grid container alignItems="stretch"
      direction="row"
      justify="center">
      <View imgFolder={imgFolder} />

      </Grid>
      </div>
      </Router>
    );
  }
}

export default App;
