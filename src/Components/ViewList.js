import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({

});


class ViewList extends Component {
  render() {

  	const {classes} = this.props
    return (
    	<ul>{this.props.children}</ul>
    );
  }
}

ViewList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewList);

