import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import {computed} from 'mobx'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import Gallery from './Gallery'
import './Gallery.css'
import { getCategories } from '../commons/categories'
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
    const categories = () => <div style={{display: 'flex'}}>
      <Typography style={{color: '#f4f4f4', display: 'inline', marginLeft: 10, marginRight: 5, marginTop: 3}}
        variant="body2" className="btn">Categories</Typography>
      {
        getCategories().map(category => {
         return (
            <Button
              key={category.ref}
              onClick={() => this.handleChange(category)}
              size="small"
              className="btn"
              style={{textTransform:'capitalize'}}>
              {category.name}
            </Button>
          )
        })
      }
    </div>

    return <div>
      <div style={{padding: 5, backgroundColor: '#484ec2'}}>
        { categories() }
      </div>
      <div style={{minHeight: '100vh', paddingTop: 20, width: 900, margin: '0 auto'}}>
        <Gallery/>
      </div>
    </div>
  }
}

export default Home
