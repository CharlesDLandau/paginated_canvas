import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Redirect,
	Route, Link, Switch } from "react-router-dom";

import { fabric } from 'fabric';

import ImageList from './ImageList.js';
import ViewList from './ViewList.js';
import Canvas from './Canvas.js';
import GridListTile from '@material-ui/core/GridListTile';

// For sorting props.data by pageNum
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}


const styles = theme => ({
  fullHeightList: {
  },  

});


class View extends Component {
	constructor(props){
	  super(props);
	  this.state = {
	  	imagesReady: false,
	  	routesReady: false,
	  };

	  this.mountFabric = this.mountFabric.bind(this)
	  this.imgChunk = this.imgChunk.bind(this)
	  this.rteChunk = this.rteChunk.bind(this)
	  
	}



	componentDidMount(){
		var sortedPages = sortByKey(this.props.data, "pageNum")

    	//Preload images and routes before render

    	this.rteChunk(sortedPages)
    	this.imgChunk(sortedPages)
	}

	componentDidUpadate(){

    	this.fabricCanvas.renderAll()
	}

	mountFabric(fabricInstance, oImg, h, w){
		this.fabricCanvas = fabricInstance

        oImg.scaleToHeight(h)
        oImg.scaleToWidth(w)

		this.fabricCanvas.add(oImg)

		this.fabricCanvas.renderAll()
	}

	imgChunk(sortedPages){
		var imgs = []
		{sortedPages.map((obj, idx) =>{
	    	imgs.push( 
	    		<GridListTile key={idx.toString()}
				to={"/page/" + idx.toString()}
				component={Link} 
		        className={this.props.classes.imageItem}
		        >
	              <img src={obj["item"]} alt={obj["item"]}/>	    
		        </GridListTile>)
	    		    }
	    		)
		
		}
		this.setState({imagesReady: imgs})
	}
	rteChunk(sortedPages){
		var rtes = []
		{sortedPages.map((obj, idx) =>{
			

	    	rtes.push(<Route key={idx.toString()}
	    		path={"/page/" + idx.toString()}
	    		render={()=><Canvas
		    			canvasId={obj["item"]} canvasOpts={{
					      selection:false,
					    }}
					    src={obj["item"]}
					    mountFabric={this.mountFabric}
					/>}
      			/>)
	    		    }
	    		)
			}

		this.setState({routesReady: rtes})
		
	}

	renderMain(){
		return (<Fragment>
	    <ImageList>
		{/* Each image is a link */}
	    {(this.state.imagesReady) ?
	    	(this.state.imagesReady) : (<ul/>)
	    
		}
		</ImageList>
		<ViewList>

		<Switch>
		<Route exact path="/" render={() => (
			  <Redirect to="/page/0"/>
			)}/>

		{/* Routes for each link*/}
        {(this.state.routesReady.length==this.props.data.length) ?
        	(this.state.routesReady) : (<ul/>)
        
    	}
			
	    </Switch>
	    </ViewList>
	    </Fragment>)
	}

    render() {
    	var renderMain = this.renderMain()
    	//Images and routes are in memory, we can render
	    return (
	    	[renderMain]
    );
  }
}


View.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(View);

