import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';

import Drawer from '@material-ui/core/Drawer';

const styles = theme => ({
  fullHeightList: {
  },  
  drawer: {
    backgroundColor: "#B8E6FF",
    marginLeft: 200,
  },
  drawerControl: {
  	display: 'flex',
  	flexWrap: 'wrap',
  	justifyContent: 'space-around',
  	overflow: 'hidden',
  },
  imageItem: {
  	width: theme.spacing.unit*15,
  	height: theme.spacing.unit*20,
  	border: 'solid',
  	borderColor: '#262626'
  }, 
  gridList: {
    width:theme.spacing.unit*20,
    height: "auto",

  },
});


class ImageList extends Component {
  render() {

  	const {classes} = this.props
    return (
    	<Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open
        >
        <div className={classes.drawerControl}>

    	<GridList className={classes.gridList} cellHeight={180} 
    	cols={1}>
		<GridListTile key="Subheader" style={{ height: 'auto' }}>
		  <ListSubheader component="div">Pages</ListSubheader>
		</GridListTile>
		{this.props.children}

    	</GridList></div>
    	</Drawer>
    );
  }
}

ImageList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageList);

