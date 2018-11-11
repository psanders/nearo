import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import LinearProgress from '@material-ui/core/LinearProgress'
import { observer, inject } from 'mobx-react'

@inject('routing')
@inject('appStore')
@inject('usersStore')
@observer
class Profile extends Component {
  state = {
    scrollPosition: 0
  }

  componentDidMount() {
    window.addEventListener("scroll", event => {
      this.setState({scrollPosition: window.pageYOffset || document.documentElement.scrollTop})
    }, false);
  }

  handleGoBack = () => window.history.length < 3
    ? this.props.routing.push('/')
    : this.props.routing.goBack()

  render() {
    const { classes, appStore, children } = this.props
    const { scrollPosition } = this.state

    return (<div>
        <AppBar elevation={scrollPosition === 0? 0 : 1}>
          <Toolbar color="secondary" style={{paddingLeft: 5}}>
            <IconButton onClick={ this.handleGoBack } color="inherit" aria-label="Close">
              <CloseIcon className={ classes.arrawBack }/>
            </IconButton>
          </Toolbar>
          {
            appStore.loading &&
            <LinearProgress />
          }
        </AppBar>
        <div className={classes.container}>
          <div className={ classes.toolbar } />
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
    width: '100vw',
    minHeight: '100vh'
  },
  flex: {
    flex: 1,
    flexGrow: 1
  },
  toolbar: theme.mixins.toolbar,
})

export default withStyles(styles)(Profile)
