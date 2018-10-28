import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import { observer, inject } from 'mobx-react'
import {computed} from 'mobx'

import Gallery from './Gallery'
import './Gallery.css'
import { scrollTop } from 'components/commons/utils'
import PostPanel from 'components/shared/postpanel/PostPanel'

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

  render() {

    const style = {
      title: {
        marginTop: 20,
        marginLeft: 10,
        fontFamily: 'Bitter'
      },
      subtitle: {
        marginLeft: 10,
        marginBottom: 20,
        fontWeight: 300
      }
    }

    return <div>
      <div style={{marginTop: 50, marginBottom: 50, width: '100vw', textAlign: 'center'}}>
        <Typography color="primary" style={style.title} component="h1" variant="h3" gutterBottom>
          Buy Sell or Trade Locally
        </Typography>
        <Typography component="h2" variant="h5" color="textSecondary"
          style={style.subtitle} gutterBottom>
          Local classifieds for jobs, housing, sales, events, services, community, and more.
        </Typography>
        <PostPanel />
      </div>
      <div className="gallery-container" style={{margin: '0 auto'}}>
        <Gallery />
      </div>
    </div>
  }
}

export default Home
