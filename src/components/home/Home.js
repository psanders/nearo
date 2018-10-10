import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { observer, inject } from 'mobx-react'
import {computed} from 'mobx'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { withRouter } from 'react-router-dom'
import Gallery from './Gallery'
import { styles } from './HomeStyles'

@inject('appStore')
@inject('postsStore')
@inject('navStore')
@inject('bookmarksStore')
@inject('notificationsStore')
@withRouter
@observer
class Home extends Component {

  goToLogin = () => this.props.history.push('/login')

  @computed get signed () {
    return this.props.usersStore.signedIn
  }

  handleChange = name => event => {
    const navInfo = this.props.navStore.navInfo
    navInfo.searchTerm = event.target.value
    this.props.navStore.setNavInfo(navInfo)
  }

  handleOnChangeLocation = locInfo => {
    const navInfo = this.props.navStore.navInfo
    navInfo.locInfo = locInfo
    this.props.navStore.setNavInfo(navInfo)
  }

  render() {
    const { classes } = this.props

    return <div >
      <Divider />
        <div style={{padding: 10, backgroundColor: '#fff'}}>
        <Typography variant="body1" color="secondary" >
          <b>Trending</b> &nbsp;&nbsp; Jobs &nbsp;&nbsp; Services &nbsp;&nbsp; RealEstate &nbsp;&nbsp; Community &nbsp;&nbsp; Events &nbsp;&nbsp; Gov
        </Typography>
        </div>
      <Divider />
      <div className={ classes.toolbar }/>
      <div style={{padding: 20, margin: '0 auto', width: '70%'}}>
        <Gallery />
      </div>
    </div>
  }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Home)
