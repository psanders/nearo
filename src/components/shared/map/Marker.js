import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Popover from '@material-ui/core/Popover'
import CardMedia from '@material-ui/core/CardMedia'
import { withStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import { imageURL, ellip } from 'components/commons/utils'

class Marker extends Component {
  state = {
    anchorEl: null,
  }

  handlePopoverOpen = event => this.setState({ anchorEl: event.currentTarget })

  handlePopoverClose = () => this.setState({ anchorEl: null })

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
            {
              post.media.length > 0 &&
              <CardMedia
                className={classes.media}
                image={ imageURL(post, 'sm') }
              />
            }
            <div className={classes.textContainer}>
              <Typography className={classnames(classes.textContent, classes.textCategory)} >{post.category}</Typography>
              <Typography className={classes.textContent}>Nearby "{ ellip(post.locText, 22) }".</Typography>
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
    backgroundColor: theme.palette.primary.light,
    border: '0.3em solid #fff',
    width: 10,
    height: 10,
    borderRadius: '50%',
    position: 'absolute',
    boxShadow: '0 0 0 0.02em ' + theme.palette.primary.main
  },
  markerContainer: {
    display: 'flex'
  },
  textContainer: {
    paddingLeft: 4
  },
  textContent: {
    fontSize: 10,
  },
  textCategory: {
    fontWeight: 'bold',
    textTransform: 'capitalize'
  }
})

export default withStyles(styles)(Marker)
