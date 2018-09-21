import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Hidden from '@material-ui/core/Hidden'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { observer, inject } from 'mobx-react'
import { ellip } from '../commons/utils'
import { styles } from './SubBarStyles'

@inject('navStore')
@inject('postsStore')
@observer
class SubBar extends Component {

  render() {
    const { classes, navStore, postsStore } = this.props
    const navInfo = navStore.navInfo

    return (
      <Toolbar className={classes.filters}>
        <Typography className={classes.title} variant="body1" color="inherit">
           { postsStore.nbHits } {postsStore.nbHits === 1 ? "result" : "results"} nearby "{ ellip(navInfo.locInfo.address, 30) }"
        </Typography>
        <span className={ classes.flex } />
        <Hidden xsDown={true}>
          <Button onClick={ postsStore.openPostDialog }
            variant="outlined" className={classes.button}
            aria-label="Add New Publication"
          >
            New Post
          </Button>
        </Hidden>
        <Hidden smUp={true}>
          <Button onClick={ postsStore.openPostDialog }
            variant="outlined" className={classes.button}
            aria-label="Add New Publication"
          >
            Post
          </Button>
        </Hidden>
      </Toolbar>
    )
  }
}

SubBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SubBar)
