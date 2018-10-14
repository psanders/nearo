import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Route, Switch } from 'react-router-dom'

import TopNav from '../components/mobtopnav/TopNav'
import NotificationBar from '../components/NotificationBar'
import BottomNav from '../components/mobbottomnav/BottomNav'
import HomePage from './home.mobile'
import Profile from './profile.mobile'
import Favorites from './favorites.mobile'

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
})

class MobileScreen extends Component {
  render () {
    const { classes } = this.props

    return <Fragment>
      <TopNav />
      <div className={ classes.toolbar } />
      <Switch>
        <Route exact path='/' component={ HomePage } />
        <Route exact path='/favorites' component={ Favorites } />
        <Route exact path='/profile' component={ Profile } />
      </Switch>
      <BottomNav />
      <NotificationBar />
    </Fragment>
  }
}

export default withStyles(styles)(MobileScreen)
