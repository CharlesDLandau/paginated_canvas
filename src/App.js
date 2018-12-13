import React, { Component } from 'react';
import './App.css';

import Grid from '@material-ui/core/Grid';

import View from "./Components/View.js"


// Generate the data expected by View
var imgFolder = require.context("./assets/img/",
        false, /\.(png|jpe?g|svg)$/)
imgFolder = imgFolder.keys().map(imgFolder)

var data = []

imgFolder.map((item, idx)=>{
  // Page numbers are not typically zero-base,
  // but this can be handled in the view as an alternative
  data.push({item: item, pageNum:idx+1})
})


class App extends Component {


  render() {
    
    return (
      
      <div className="App-header">
      <Grid container alignItems="stretch"
      direction="row"
      justify="center">
      <View imgFolder={imgFolder}
      data={data} />

      </Grid>
      </div>
      
    );
  }
}

export default App;
