import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import { observer, inject } from 'mobx-react'
import { computed } from 'mobx'

import { imageURL } from 'components/commons/utils'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: '#fff',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
})

@inject('postsStore')
@inject('routing')
@observer
class StaffPick extends Component {

  @computed get posts() {
    return this.props.postsStore.staffPick
  }

  render () {
    const { classes, routing } = this.props

    return (
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={2.2}>
          {this.posts.map(post => (
            post.media.length > 0 &&
            <GridListTile key={post.id}>
              <img onClick={() => routing.push('/posts/' + post.id)} src={imageURL(post, 'md')} alt={post.title} />
              <GridListTileBar
                title={post.title}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    )
  }
}

StaffPick.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(StaffPick)