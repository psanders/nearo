import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Moment from 'react-moment'

import MapCard from './map/MapCard'
import ProfileCard from './profile/ProfileCard'
import About from './About'
import Ads from './Ads'
import { db } from './commons/firebase/firebase'

class SinglePostContainer extends Component {
  state = {
    post: {},
    user: {}
  }

  currentPath = () =>  window.location.pathname.split('/')[2]

  componentDidMount () {
    const postRef = db.collection('posts').doc(this.currentPath())
    postRef.get()
    .then(post => {
      if (post.exists && !post.data().deleted) {
        this.loadUser(post.data().userId)
        this.setState({post: post.data()})
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

  render() {
    const { classes } = this.props
    const { post, user } = this.state

    return (
      <Grid
        container
        direction="row"
        justify="center"
        spacing={32}>
          <Grid item sm={8} md={5} xs={10}>
            <br />
            <div style={{backgroundColor: '#fff', padding: 10}}>
              { post.image &&
                <CardMedia
                  image={ post.image }
                >
                  <div style={{ width: 130, height: 210, borderRadius: 2}} />
                </CardMedia>
              }
              <br />
              <Typography className={ classes.capitalize } variant="title" gutterBottom>
                { post.category }
              </Typography>
              <Typography variant="body1" gutterBottom>
                { post.body }
              </Typography>
              <Typography variant="caption" gutterBottom>
                Posted <Moment fromNow={true} interval={30000}>{post.timestamp}</Moment> nearby { "\"" + post.locText + "\""}
              </Typography>
            </div>
          </Grid>
          <Grid item sm={8} md={3} xs={10}>
            <br />
            <ProfileCard user={ user }/>
            <br />
            { post._geoloc &&
              <MapCard center={ post._geoloc } />
            }
            <br />
            <Ads />
            <br />
            <About />
            <br />
          </Grid>
          <br />
      </Grid>
    )
  }
}

SinglePostContainer.propTypes = {
    classes: PropTypes.object.isRequired,
}

const styles = {
  root: {
    backgroundColor: '#fff'
  },
  capitalize: {
    textTransform: 'capitalize'
  }
}

export default withStyles(styles)(SinglePostContainer)
