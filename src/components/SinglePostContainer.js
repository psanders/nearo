import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CardMedia from '@material-ui/core/CardMedia'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import Hidden from '@material-ui/core/Hidden'
import MoneyIcon from '@material-ui/icons/AttachMoney'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Moment from 'react-moment'
import { observer } from 'mobx-react'
import ellipsize from 'ellipsize'

import PostActions from './postcard/PostActions'
import MapCard from './map/MapCard'
import ProfileCard from './profile/ProfileCard'
import About from './About'
import Ads from './Ads'
import { db } from './commons/firebase/firebase'
import { imageURL } from './commons/utils'

@observer
class SinglePostContainer extends Component {
  state = {
    post: {},
    user: {}
  }

  currentPath = () =>  window.location.pathname.split('/')[2]

  componentDidMount () {
    const postRef = db.collection('posts').doc(this.currentPath())
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

  handleSold = (sold) => {
    const post = this.state.post
    post.sold = sold
    this.setState({post: post})
  }

  render() {
    const { classes } = this.props
    const { post, user } = this.state

    return (
      <Grid
        container
        direction="row"
        justify="center"
        className={classes.top20}
        spacing={16}
        >
          <Grid item sm={10} md={5} xs={11}>
            <Grid item style={{backgroundColor: '#fff', padding: 10}}>
              { post.media && post.media.length > 0 &&
                <CardMedia
                  image={ imageURL(post, 'md') }
                  className={classes.bottom10}
                >
                  {
                    post.category === 'forsale' && post.price &&
                    <Chip
                      avatar={<Avatar><MoneyIcon className={classes.moneyIcon}></MoneyIcon></Avatar>}
                      label={ post.sold ? 'Sold' : post.price }
                      className={classes.chip}
                      color="secondary"
                    />
                  }
                  <div style={{ width: 130, height: 210, borderRadius: 2}} />
                </CardMedia>
              }
              <Typography className={ classes.capitalize } variant="title" gutterBottom>
                { post.category }
              </Typography>
              <Typography variant="body1" gutterBottom>
                { post.body }
              </Typography>
              <Typography variant="caption" gutterBottom className={classes.bottom10}>
                Posted <Moment fromNow={true} interval={30000}>{post.timestamp}</Moment>
                nearby "{ ellipsize(post.locText, 22, { truncate: false }) }"
              </Typography>

              {
                post.id &&
                <PostActions post={ post }
                  className={classes.top20}
                  bookmarksStore={this.props.bookmarksStore}
                  postsStore={this.props.postsStore}
                  usersStore={this.props.usersStore}
                  handleSold={this.handleSold}
                  url={ "https://locally-57510.firebaseapp.com/posts/" + post.id }
                  onChangeBookmark={ this.handleBookmark }
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
            <Hidden smDown={true}>
              <Ads className={classes.bottom20}/>
              <br />
            </Hidden>
            <About/>
            <br/>
          </Grid>
      </Grid>
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
