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
import Icon360 from '@material-ui/icons/CompassCalibration'
import Hidden from '@material-ui/core/Hidden'
import Linkify from 'react-linkify'
import classnames from 'classnames'

import { styles } from './PostCardStyles'
import { getCategory } from '../commons/categories'
import { imageURL, hasPanorama } from '../commons/utils'
import PostActions from './PostActions'

class PostCard extends React.Component {

  render() {
    const { classes, post } = this.props

    const holdover = () => <div
      style={{ backgroundColor: '#f4f4f4',
      border: '1px solid #757ce8', width: 130,
      height: 110, borderRadius: 3}}>
      <LinkIcon className={classes.shareIcon} color="primary" style={{
        width: '30px', position: 'relative', top: 'calc(50% - 15px)'}}/>
    </div>

    const panoramaIcon = <Icon360 className={classes.panoramaIcon} />

    const panoramaIconMobile = <Icon360 className={classnames(classes.panoramaIcon, classes.panoramaIconBig)} />

    const imageMobile = () =>
      <CardMedia
         className={ classes.cover }
         image={ imageURL(post, 'md') }
      >
       { hasPanorama(post) && panoramaIconMobile }
       <div style={{ width: 'calc(100vw - 33px)', height: 320}} />
      </CardMedia>

    const imageDesktop = () =>
      <CardMedia
         className={ classes.cover }
         image={ imageURL(post, 'sm') }
      >
       { hasPanorama(post) && panoramaIcon }
       <div style={{ width: 130, height: 110, borderRadius: 2}} />
      </CardMedia>

    const image = (post, mord) => !post.media || post.media.length === 0
      ? holdover()
      : mord()

    const card = (post) => <Grid container spacing={16}>
      <Hidden smUp={true}>
        <Grid item>
          <Link to={'/posts/' + post.id} style={{color: '#fff', textDecoration: 'none'}}>
            <ButtonBase aria-label="Open Publication Details">
              { image(post, imageMobile) }
            </ButtonBase>
          </Link>
        </Grid>
      </Hidden>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={16}>
          <Grid item xs>
            <Typography gutterBottom variant="subheading">
               { post.category && getCategory(post.category).name }
            </Typography>
            <Typography gutterBottom>
              <Linkify>{ post.body }</Linkify>
            </Typography>
            <Typography variant="caption" color="textSecondary">By { post.author } <Moment fromNow={true} interval={30000}>{post.timestamp}</Moment></Typography>
          </Grid>
          <Grid item>
            <PostActions post={ post }
              url={ "https://nearo.co/posts/" + post.id }
            />
          </Grid>
        </Grid>
      </Grid>
      <Hidden xsDown={true}>
        <Grid item style={{paddingTop: 35}}>
          <Link to={'/posts/' + post.id} style={{color: '#fff', textDecoration: 'none'}}>
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
          <div className={classes.post}>
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
