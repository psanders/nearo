import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import { observer, inject } from 'mobx-react'
import {computed} from 'mobx'

import Categories from './Categories'
import Gallery from './Gallery'
import './Gallery.css'
import { scrollTop } from '../commons/utils'

@inject('routing')
@inject('postsStore')
@inject('navStore')
@inject('bookmarksStore')
@inject('notificationsStore')
@observer
class Home extends Component {

  goToLogin = () => this.props.routing.push('/profile')

  @computed get signed () {
    return this.props.usersStore.signedIn
  }

  componentDidMount() {
    scrollTop()
  }

  handleChange = category => {
    const navInfo = this.props.navStore.navInfo
    navInfo.searchTerm = category.name
    this.props.navStore.setNavInfo(navInfo)
    this.props.routing.push('/explore')
  }

  render() {
    return <div>
      <div style={{minHeight: '100vh', paddingTop: 20, width: 900, margin: '0 auto'}}>
        <div style={{marginBottom: 20, marginLeft: 10, width: 880}}>
          <Typography style={{color: 'gray'}} component="h1" variant="overline" gutterBottom>
            Results near { this.props.navStore.navInfo.locInfo.address }
          </Typography>
          <Categories onCategoryChange={ category => this.handleChange(category)}/>
        </div>
        <Gallery/>
      </div>
    </div>
  }
}

export default Home
