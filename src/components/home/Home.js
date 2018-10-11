import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import {computed} from 'mobx'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import { withRouter } from 'react-router-dom'

import Gallery from './Gallery'
import './Gallery.css'
import { getCategories } from '../commons/categories'

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

  handleChange = category => {
    const navInfo = this.props.navStore.navInfo
    navInfo.searchTerm = category.name
    this.props.navStore.setNavInfo(navInfo)
    this.props.history.push('/explore')
  }

  render() {
    const categories = () => <div>
      <Typography style={{display: 'inline', marginRight: 15}}
        variant="body2" color="secondary">Categories</Typography>
      {
        getCategories().map(category => {
         return (
            <Button
              key={category.ref}
              onClick={() => this.handleChange(category)}
              size="small"
              color="secondary"
              style={{textTransform:'capitalize'}}>
              {category.name}
            </Button>
          )
        })
      }
    </div>

    return <div >
      <Divider />
        <div style={{padding: 5, backgroundColor: '#fff'}}>
          { categories() }
        </div>
      <Divider />
      <div style={{paddingTop: 20, width: 900, margin: '0 auto'}}>
        <Gallery/>
      </div>
    </div>
  }
}

export default Home
