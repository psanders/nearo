import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'
import CardMedia from '@material-ui/core/CardMedia'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import LinkIcon from '@material-ui/icons/Link'
import Icon360 from '@material-ui/icons/ThreeSixty'
import Hidden from '@material-ui/core/Hidden'
import Linkify from 'react-linkify'
import classnames from 'classnames'
import firebase from 'firebase/app'

import { styles } from './PostCardStyles'
import { getCategory } from '../commons/categories'
import { imageURL, hasPanorama } from '../commons/utils'
import PostActions from './PostActions'

class PostCard extends React.Component {

  render() {
    const { classes, post } = this.props

    const placeHolder = () => <div
        className={classes.placeHolder}
      >
        <LinkIcon className={classes.shareIcon} color="primary"
        style={{transform: 'rotate(45deg)', width: '30px', position: 'relative', top: 'calc(50% - 15px)'}}/>
      </div>

    const panoramaIcon = <Icon360 className={classes.panoramaIcon} />

    const panoramaIconMobile = <Icon360 className={classnames(classes.panoramaIcon, classes.panoramaIconBig)} />

    const imageMobile = () =>
      <div>
        <img alt="" style={{width: '100vw'}} src={ imageURL(post, 'md') } />
         { hasPanorama(post) && panoramaIconMobile }
      </div>

    const imageDesktop = () =>
      <CardMedia
         className={ classes.cover }
         image={ imageURL(post, 'sm') }
      >
       { hasPanorama(post) && panoramaIcon }
      </CardMedia>

    const image = (p, m) => !p.media || p.media.length === 0 ? placeHolder() : m()

    const card = (post) => <Grid container>
      <Hidden smUp={true}>
        <Grid item>
          <Link to={'/posts/' + post.id}>
            <ButtonBase aria-label="Open Publication Details">
              { image(post, imageMobile) }
            </ButtonBase>
          </Link>
        </Grid>
      </Hidden>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={0}>
          <Grid item xs style={{padding: 10}}>
            <Typography gutterBottom variant="subheading">
               { post.category && getCategory(post.category).name }
            </Typography>
            <Typography gutterBottom>
              <Linkify>{ post.body }</Linkify>
            </Typography>
            <Typography variant="caption" color="textSecondary">By { post.author }
              &nbsp;<Moment fromNow={true} interval={30000}>{new firebase.firestore.Timestamp(post.timestamp.seconds, post.timestamp.nanoseconds).toDate()}</Moment>
            </Typography>
          </Grid>
          <Grid item >
            <div className={classes.actionsContainer}>
              <PostActions post={ post } />
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Hidden xsDown={true}>
        <Grid item style={{paddingTop: 35}}>
          <Link to={'/posts/' + post.id}>
            <ButtonBase className={classes.image} aria-label="Open Publication Details">
              { image(post, imageDesktop) }
            </ButtonBase>
          </Link>
        </Grid>
      </Hidden>
    </Grid>

    return (
      <div>
        <Hidden mdUp={true}>
          <div className={classnames(classes.post, classes.postMobile)}>
            { card(post)}
          </div>
        </Hidden>
        <Hidden smDown={true} >
        <div className={classnames(classes.post, classes.postDesktop)}>
          { card(post)}
        </div>
        </Hidden>
      </div>
    )
  }
}

PostCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PostCard)
