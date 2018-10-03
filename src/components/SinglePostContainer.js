import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CardMedia from '@material-ui/core/CardMedia'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import MoneyIcon from '@material-ui/icons/AttachMoney'
import Typography from '@material-ui/core/Typography'
import Linkify from 'react-linkify'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Moment from 'react-moment'
import { observer, inject } from 'mobx-react'
import ContentLoader from 'react-content-loader'
//import { Helmet } from "react-helmet"

import PostActions from './postcard/PostActions'
import MapCard from './map/MapCard'
import ProfileCard from './profile/ProfileCard'
import About from './About'
//import Ads from './Ads'
import { db } from './commons/firebase/firebase'
import {
  imageURL,
  ellip,
  currentPath,
  hasPanorama,
  hasMedia,
} from './commons/utils'
import Viewer360 from './Viewer360'

@inject('usersStore')
@inject('postsStore')
@inject('bookmarksStore')
@inject('notificationsStore')
@observer
class SinglePostContainer extends Component {
  state = {
    post: {},
    user: {}
  }

  componentDidMount () {
    const postRef = db.collection('posts').doc(currentPath(2))
    postRef.get()
    .then(result => {
      if (result.exists && !result.data().deleted) {
        const post = result.data()
        post.id = result.id
        this.setState({post: post})
        this.loadUser(post.userId)
      } else {
        // throw 404
      }
    }).catch(error => {
      console.error('Unable to fetch post information', error)
    })
  }

  loadUser = userId => {
    const userRef = db.collection('users').doc(userId)
    userRef.get()
    .then(user => {
      if (user.exists) {
        this.setState({user: user.data()})
      }
    }).catch(error => {
      console.error('Unable to fetch user information', error)
    })
  }

  handleSold = (post) => {
    this.setState({post: post})
  }

  render() {
    const { classes } = this.props
    const { post, user } = this.state

    const realContent = (post, classes) => {
      return <div>
        { hasMedia(post)  &&
          !hasPanorama(post) &&
          <CardMedia
            image={ imageURL(post, 'md') }
            className={classes.bottom10}
          >
            {
              post.category === 'forsale' && (post.price > 0 || post.sold) &&
              <Chip
                avatar={<Avatar><MoneyIcon className={classes.moneyIcon}></MoneyIcon></Avatar>}
                label={ post.sold ? 'Sold' : post.price }
                className={classes.chip}
                color="secondary"
              />
            }
            <div style={{ width: 130, height: 300, borderRadius: 2}} />
          </CardMedia>
        }
        { hasMedia(post)  &&
          hasPanorama(post) &&
          <div className={classes.bottom10}>
            <Viewer360 height="300px"
              imageURL={imageURL(post, 'panorama')}
              />
          </div>
        }
        <Typography className={ classes.capitalize } variant="title" gutterBottom>
          { post.category }
        </Typography>
        <Typography variant="body1" gutterBottom>
          <Linkify>{ post.body }</Linkify>
        </Typography>
        <Typography variant="caption" gutterBottom className={classes.bottom10}>
          Posted <Moment fromNow={true} interval={30000}>{post.timestamp}</Moment> nearby "{ ellip(post.locText, 22) }"
        </Typography>
      </div>
    }

    const mockContent = () => {
      return <ContentLoader height={345}
      preserveAspectRatio={"xMidYMid meet"}>
      <rect x="0" y="0" rx="0" ry="0" width="400" height="230" />
      <rect x="0" y="240" rx="0" ry="0" width="100" height="10" />
      <rect x="0" y="260" rx="0" ry="0" width="380" height="6.4" />
      <rect x="0" y="270" rx="0" ry="0" width="350" height="6.4" />
      <rect x="0" y="280" rx="0" ry="0" width="360" height="6.4" />
      <rect x="0" y="290" rx="0" ry="0" width="350" height="6.4" />
      <rect x="0" y="300" rx="0" ry="0" width="370" height="6.4" />
    </ContentLoader>
    }

    const toUpper = (lower) => lower ? "- " + lower.replace(/^\w/, c => c.toUpperCase()) : ""

    return (
      <div>
        {/*<Helmet>
        <title>Nearo {upper(post.category)}</title>
      </Helmet>*/}
        <Grid
          container
          direction="row"
          justify="center"
          className={classes.top20}
          spacing={16}
          >
            <Grid item sm={10} md={5} xs={11}>
              <Grid item style={{backgroundColor: '#fff', padding: 10}}>
                { post.id ? realContent(post, classes) : mockContent() }

                {
                  post.id &&
                  <PostActions post={ this.state.post }
                    className={classes.top20}
                    url={ "https://nearo.co/posts/" + post.id }
                  />
                }
              </Grid>
            </Grid>
            <Grid item sm={10} md={3} xs={11}>
              <ProfileCard user={ user }/>
              <br />
              {
                post._geoloc &&
                <div>
                  <MapCard center={ post._geoloc }/>
                  <br />
                </div>
              }
              {/*<Hidden smDown={true}>
                <Ads className={classes.bottom20}/>
                <br />
              </Hidden>*/}
              <About/>
              <br/>
            </Grid>
        </Grid>
      </div>
    )
  }
}

SinglePostContainer.propTypes = {
    classes: PropTypes.object.isRequired,
}

const styles = theme => ({
  root: {
    backgroundColor: '#fff'
  },
  capitalize: {
    textTransform: 'capitalize'
  },
  top10: {
    marginTop: 10
  },
  top20: {
    marginTop: 20
  },
  bottom10: {
    marginBottom: 10
  },
  bottom20: {
    marginBottom: 20
  },
  chip: {
    margin: theme.spacing.unit,
    color: '#fff'
  },
  moneyIcon: {
    color: '#fff'
  },
})

export default withStyles(styles)(SinglePostContainer)
