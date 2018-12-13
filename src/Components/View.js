import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router,
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
	  
	}



	componentDidMount(){
    	var sortedPages = sortByKey(this.props.data, "pageNum")
    	this.imgChunk(sortedPages)
    	this.rteChunk(sortedPages)
	}

	mountFabric(fabricInstance){
		this.fabricCanvas = fabricInstance
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
		this.setState({imagesReady: imgs})
		}
	}
	rteChunk(sortedPages){
		var rtes = []
		{sortedPages.map((obj, idx) =>{
	    	rtes.push(<Route key={idx.toString()}
	    		path={"/page/" + idx.toString()}>
	    		<Canvas
	    			canvasId={obj["item"]} canvasOpts={{
				      selection:false,
				    }}
				    src={obj["item"]}
				    mountFabric={this.mountFabric}
				/>
      			</Route>)
	    		    }
	    		)
			}
		this.setState({routesReady: rtes})
		
	}


    render() {
    	//Preload images and routes before render

    	//Images and routes are in memory, we can render
	    return (

	    	<Router>
	    	<div>
	    	<Switch>
			{/* Redirect to the first page*/}
			<Route exact path="/">
			    <Link to={"/page/0"}>Open</Link>
			</Route>
			<Route path="/page">
			<Fragment>
		    <ImageList>
			{/* Each image is a link */}
		    {(this.state.imagesReady) ?
		    	(this.state.imagesReady) : (<ul/>)
		    
			}
			</ImageList>
			<ViewList>

			<Switch>


			{/* Routes for each link*/}
	        {(this.state.routesReady) ?
	        	(this.state.routesReady) : (<ul/>)
	        
	    	}
				
		    </Switch>
		    </ViewList>
		    </Fragment>
		    </Route>
		    </Switch>
		    </div>
		    </Router>
    );
  }
}


View.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(View);

