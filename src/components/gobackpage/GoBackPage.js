import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import LinearProgress from '@material-ui/core/LinearProgress'
import { observer, inject } from 'mobx-react'
import classnames from 'classnames'

@inject('appStore')
@inject('usersStore')
@observer
class Profile extends Component {

  render() {
    const { classes, appStore, children } = this.props

    return (<div>
        <AppBar elevation={ 0 }>
          <Toolbar color="secondary" >
            <IconButton onClick={() => appStore.currentView('/')} color="inherit" aria-label="Close">
              <ArrowBackIcon className={classes.arrawBack}/>
            </IconButton>
            <Typography variant="title" className={classnames(classes.flex, classes.logo)}>
              Nearo
            </Typography>
          </Toolbar>
          {
            appStore.loading &&
            <LinearProgress />
          }
        </AppBar>
        <div className={classes.container}>
          { children }
        </div>
      </div>
    )
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
}

const styles = theme => ({
  arrawBack: {
    color: '#fff'
  },
  logo: {
    color: '#fff'
  },
  container: {
    margin: '0 auto',
    width: '100wv',
    height: 'calc(100vh - 115px)',
    background: '#fff',
  },
  flex: {
    flex: 1,
    flexGrow: 1
  },
})

export default withStyles(styles)(Profile)
