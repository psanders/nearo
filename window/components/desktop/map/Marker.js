import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import CardMedia from '@material-ui/core/CardMedia'
import { withStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import { observer, inject } from 'mobx-react'
import { computed } from 'mobx'
import Zoom from '@material-ui/core/Zoom'

import { imageURL, ellip } from 'components/commons/utils'

@inject('postsStore')
@observer
class Marker extends Component {
  state = {
    arrowRef: null,
  }

  @computed get isHightlighted() {
    if (!this.props.postsStore.postHighlighted) return false
    return this.props.post.id === this.props.postsStore.postHighlighted.id
  }

  handlePopoverOpen = event => this.props.postsStore.highlightPost(this.props.post)

  handlePopoverClose = () => this.props.postsStore.highlightPost(null)

  handleArrowRef = node => {
    this.setState({
      arrowRef: node,
    });
  };

  render() {
    const { classes, post, latLng } = this.props

    return (
      <div lat={ latLng.lat } lng={ latLng.lng }>
        <Tooltip TransitionComponent={Zoom} open={this.isHightlighted} classes={{ tooltip: classes.lightTooltip, popper: classes.arrowPopper }}
          PopperProps={{
            popperOptions: {
              modifiers: {
                arrow: {
                  enabled: Boolean(this.state.arrowRef),
                  element: this.state.arrowRef,
                },
              },
            },
          }}
          title={
          <React.Fragment>
            <div  className={classes.markerContainer}>
              {
                post.media.length > 0 &&
                <CardMedia
                  className={classes.media}
                  image={ imageURL(post, 'sm') }
                />
              }
              <div className={classes.textContainer}>
                <Typography className={classnames(classes.textContent, classes.textCategory)} >{ post.title }</Typography>
                <Typography className={classes.textContent}>Nearby "{ ellip(post.locText, 22) }".</Typography>
                <Typography className={classes.textContent} variant="caption">By {post.author} </Typography>
              </div>
            </div>
            <span className={classes.arrowArrow} ref={this.handleArrowRef} />
          </React.Fragment>
        }>
          <div
            onMouseEnter={ this.handlePopoverOpen }
            onMouseLeave={ this.handlePopoverClose }
            className={ classes.marker }
            style={{
              backgroundColor: this.isHightlighted? '#8bc34a': '',
              zIndex: this.isHightlighted? 1000: '',
            }}
          />
        </Tooltip>
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
  },
  lightTooltip: {
    background: theme.palette.common.white,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
  arrowPopper: {
    '&[x-placement*="bottom"] $arrowArrow': {
      top: 0,
      left: 0,
      marginTop: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${theme.palette.common.white} transparent`,
      },
    },
    '&[x-placement*="top"] $arrowArrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${theme.palette.common.white} transparent transparent transparent`,
      },
    },
    '&[x-placement*="right"] $arrowArrow': {
      left: 0,
      marginLeft: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent ${theme.palette.common.white} transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrowArrow': {
      right: 0,
      marginRight: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent ${theme.palette.common.white}`,
      },
    },
  },
  arrowArrow: {
    position: 'absolute',
    fontSize: 7,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
})

export default withStyles(styles)(Marker)
