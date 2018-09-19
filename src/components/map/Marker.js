import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Popover from '@material-ui/core/Popover'
import CardMedia from '@material-ui/core/CardMedia';
import blue from '@material-ui/core/colors/blue'
import { withStyles } from '@material-ui/core/styles'
import ellipsize from 'ellipsize'

const styles = theme => ({
  media: {
    height: 42,
    width: 45
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing.unit,
  },
  marker: {
    backgroundColor: blue[500],
    border: '0.3em solid #fff',
    width: 10,
    height: 10,
    borderRadius: '50%',
    position: 'absolute',
    boxShadow: '0 0 0 0.02em ' + blue[500]
  },
  markerContainer: {
    display: 'flex'
  },
  textContainer: {
    padding: 2
  },
  textContent: {
    fontSize: 10,
  }
})

class Marker extends Component {
  state = {
    anchorEl: null,
  }

  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handlePopoverClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { classes, latLng, post } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    return (
      <div lat={ latLng.lat } lng={ latLng.lng }>
        <div
          aria-owns={open ? 'mouse-over-popover' : null}
          aria-haspopup="true"
          onMouseEnter={this.handlePopoverOpen}
          onMouseLeave={this.handlePopoverClose}
          className={ classes.marker }
        />
        <Popover
          id="mouse-over-popover"
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          onClose={this.handlePopoverClose}
          disableRestoreFocus
        >
          <div className={classes.markerContainer}>
            <div style={{padding: 2}}>
              {
                post.image &&
                <CardMedia
                  className={classes.media}
                  image={post.image}
                />
              }
            </div>
            <div className={classes.textContainer}>
              <Typography className={classes.textContent} style={{fontWeight: 'bold', textTransform: 'capitalize'}}>{post.category}</Typography>
              <Typography className={classes.textContent}>Nearby "{ ellipsize(post.locText, 22, { truncate: false }) }".</Typography>
              <Typography className={classes.textContent} variant="caption">By {post.author} </Typography>
            </div>
          </div>
        </Popover>
      </div>
    )
  }
}

Marker.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Marker)
