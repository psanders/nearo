import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Linkify from 'react-linkify'

const card = {
  padding: 5,
}

class MediaCard extends Component {
  render = () => {
    const { post, classes } = this.props
    return <div style={ card } >
      <Typography className={ classes.capitalize } component="h2" variant="subtitle2" gutterBottom>
        Description
      </Typography>
      <Typography color="textSecondary" variant="body1" gutterBottom>
        <Linkify>{ post.body }</Linkify>
      </Typography>
    </div>
  }
}

export default MediaCard
