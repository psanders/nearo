import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'
import Linkify from 'react-linkify'
import { observer, inject } from 'mobx-react'

import { hasMedia } from 'components/commons/utils'
import PostActions from 'components/shared/postactions/PostActions'
import PlaceHolder from 'components/desktop/postcard/PlaceHolder'
import Caption from 'components/mobile/postcard/Caption'
import PostImage from 'components/desktop/postcard/PostImage'

const styles = {
  post: {
    '&:hover': {
      backgroundColor: '#E3F2FD'
    }
  },
  actionsContainer: {
    padding: 10
  },
}

@inject('routing')
@inject('postsStore')
@observer
class PostCard extends Component {
  state = {
    cardRef: null
  }

  handleRef = node => {
    if (node) {
      this.setState({
        cardRef: node,
      });
    }
  }

  isElementInViewport (el) {
    const rect = el.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  handleMouseEnter = () => {
    if (!this.state.isScrolling) {
      this.props.postsStore.highlightPost(this.props.post)
    }
  }

  handleMouseLeave = () => this.props.postsStore.highlightPost(null)

  componentDidMount() {
    let isScrolling
    window.addEventListener("scroll", event => {
      window.clearTimeout( isScrolling )
      isScrolling = setTimeout(() => {
        if(this.isElementInViewport(this.state.cardRef)) {
          this.props.postsStore.addVisiblePost(this.props.post)
        } else {
          this.props.postsStore.removeNonVisiblePost(this.props.post)
        }
      }, 66)
    }, false);
  }

  render() {
    const { classes, post, routing, postsStore } = this.props

    return <div ref={this.handleRef}>
      <Paper elevation={0} className={ classes.post }>
        <Grid container>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={0}>
              <Grid item xs style={{padding: 10}}>
                <Typography variant="subtitle1" gutterBottom>
                  { post.title }
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <Linkify>{ post.body }</Linkify>
                </Typography>
                <Caption post={ post }/>
              </Grid>
              <Grid item >
                <div className={classes.actionsContainer}>
                  <PostActions post={ post } />
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{paddingTop: 35}}>
            <ButtonBase
              onMouseEnter={ this.handleMouseEnter }
              onMouseLeave={ this.handleMouseLeave }
              className={classes.image} aria-label="Open Publication Details" onClick={() => {
              postsStore.currentPost = post
              routing.push('/posts/' + post.id)}
            }>
              { hasMedia(post) && <PostImage post={ post }/> }
              { !hasMedia(post) && <PlaceHolder /> }
            </ButtonBase>
          </Grid>
        </Grid>
      </Paper>
    </div>
  }
}

PostCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PostCard)
