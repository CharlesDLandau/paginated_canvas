import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Canvas from './Canvas.js';

 



const styles = theme => ({
  fullHeightList: {
  },  

});


class PageView extends Component {
	constructor(props){
		super(props);
		this.state = {
			sources:this.props.imgFolder,
			fabrics:[]
		}
	this.registerFabric = this.registerFabric.bind(this)
	}
  componentDidMount(){
  }

  componentDidUpdate(){
  	if (this.props.imgFolder !== this.state.sources){
  	  	this.setState({sources:this.props.imgFolder})}
  }

  registerFabric = name => (f) =>{
  	this.setState({fabrics: [...this.state.fabrics, {name: f}]})
  	console.log(f)
  }

 

  render(){
  	var sources = this.state.sources
    return (
    <div>
    {sources.map((item, index) => {
	    return <Canvas key={index.toString()}
			        registerFabric={
			        	this.registerFabric(index.toString)
			        }
			        canvasId={"canvasPage"+index}
			        src={item}
			        />}

			
	    
	    )}
	</div>      
    );
  }
}


PageView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PageView);

