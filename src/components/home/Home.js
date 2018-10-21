import React, { Component } from 'react'
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
          <Categories onCategoryChange={ category => this.handleChange(category)}/>
        </div>
        <Gallery/>
      </div>
    </div>
  }
}

export default Home
