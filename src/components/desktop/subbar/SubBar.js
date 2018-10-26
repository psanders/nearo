import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { observer, inject } from 'mobx-react'

import { ellip } from 'components/commons/utils'
import PostPanel from 'components/shared/postpanel/PostPanel'
import { styles } from './SubBarStyles'

@inject('navStore')
@inject('postsStore')
@observer
class SubBar extends Component {
  render() {
    const { classes, navStore, postsStore } = this.props
    const navInfo = navStore.navInfo

    return (
      <div>
        <Toolbar className={classes.filters}>
          <Typography className={classes.title} component="h1" variant="body1" color="inherit">
             { postsStore.nbHits } {postsStore.nbHits === 1 ? "result" : "results"} nearby "{ ellip(navInfo.locInfo.address, 30) }"
          </Typography>
          <span className={ classes.flex } />
          <PostPanel />
        </Toolbar>
      </div>
    )
  }
}

SubBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SubBar)
