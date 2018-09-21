import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Hidden from '@material-ui/core/Hidden'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { observer } from 'mobx-react'
import { ellip } from '../commons/utils'

@observer
class SubBar extends Component {

  render() {
    const { classes } = this.props
    const navInfo = this.props.navStore.navInfo
    const postsStore = this.props.postsStore

    return (
      <Toolbar className={classes.filters}>
        <Typography className={classes.title} variant="body1" color="inherit">
           { postsStore.posts.length } {postsStore.posts.length == 1 ? "result" : "results"} nearby "{ ellip(navInfo.locInfo.address, 30) }"
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

const styles = theme => ({
  filters: {
    backgroundColor: '#f4f4f4',
  },
  button: {
    minHeight: 10,
    minWidth: 10,
    padding: 7,
    textTransform: 'capitalize',
    fontSize: 13,
    border: '0',
    backgroundColor: theme.palette.accent.main,
    '&:hover': {
      backgroundColor: theme.palette.accent.light
    },
  },
  newPostBtn: {
    backgroundColor: theme.palette.accent.main,
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: theme.palette.accent.light
    },
    height: 42,
    fontSize: 16
  },
  flex: {
    flex: 1
  },
  title: {
    color: theme.palette.secondary.main
  }
})

export default withStyles(styles)(SubBar)
