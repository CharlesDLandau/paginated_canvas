import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Route, Link } from "react-router-dom";

import ImageList from './ImageList.js';
import PageView from './PageView.js';
import GridListTile from '@material-ui/core/GridListTile';

 



const styles = theme => ({
  fullHeightList: {
  },  

});


class View extends Component {
  render() {
  	const {classes} = this.props
    return (
    <Fragment>
	    <ImageList>
	    {this.props.imgFolder.map((item, index) => {
        return  (
    	<GridListTile key={index.toString()}
        	className={classes.imageItem}
              >
              <img src={item} alt={item}/>
    
        </GridListTile>
        			)
        		}
        	)
		}
		</ImageList>
	    <PageView imgFolder={this.props.imgFolder}/>
	</Fragment>
    );
  }
}


View.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(View);

