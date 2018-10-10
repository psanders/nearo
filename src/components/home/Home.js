import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { observer, inject } from 'mobx-react'
import {computed} from 'mobx'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import { withRouter } from 'react-router-dom'

import Gallery from './Gallery'
import './Gallery.css'
import { styles } from './HomeStyles'
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
    const { classes } = this.props

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
        <div style={{padding: 10, backgroundColor: '#fff'}}>
          { categories() }
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
