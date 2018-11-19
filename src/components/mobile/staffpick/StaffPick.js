import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Grow from '@material-ui/core/Grow'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
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
    fontSize: 12
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  listTile: {
    borderRadius: 4,
    height: 180
  },
  avatar: {
    zIndex: 1000,
    width: 36,
    height: 36,
    position: 'absolute',
    top: 5,
    left: 5,
    border: '2px solid ' + theme.palette.primary.main
  },
  avatarImage: {
    width: 34,
    height: 34,
    borderRadius: '50%',
    top: 'calc(50% - 17px)',
    left: 'calc(50% - 17px)',
    position: 'absolute',
    selfAlign: 'center'
  }
})

@inject('postsStore')
@inject('routing')
@inject('bookmarksStore')
@observer
class StaffPick extends Component {
  @computed get posts() {
    return this.props.postsStore.staffPick
  }

  render () {
    const { classes, routing } = this.props

    return (
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={2.5}>
          {this.posts.map(post => (
            <Grow key={post.id} in={true} timeout={500}>
              <GridListTile classes={{tile: classes.listTile}}>
                <Avatar classes={{root:classes.avatar, img: classes.avatarImage}} src={post.avatar} />
                <img onClick={() => routing.push('/posts/' + post.id)} src={imageURL(post, 'md')} alt={post.title} />
                <GridListTileBar
                  title={post.title}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                  }}
                />
              </GridListTile>
            </Grow>
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
