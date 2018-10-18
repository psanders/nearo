import React, { Component, Fragment} from 'react'
import Hidden from '@material-ui/core/Hidden'
import { observer, inject } from 'mobx-react'
import Helmet from 'react-helmet-async'

import { capitalize } from '../components/commons/utils'
import MobileScreen from './mobile/mobile'
import DesktopScreen from './desktop/desktop'

@inject('routing')
@inject('appStore')
@observer
class MainContainer extends Component {

  scrollTop = () => {
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
  }

  render () {
    const { routing } = this.props

    return(
      <Fragment>
        <Helmet>
          <title>
            Nearo
            { routing.location.pathname !== '/' ? ' - ' : ''}
            { capitalize(routing.location.pathname.replace('/', '')) }
          </title>
          <link rel="canonical" href={routing.location.pathname} />
        </Helmet>
        <Hidden xsDown={true}>
          <DesktopScreen />
        </Hidden>
        <Hidden smUp={true}>
          <div style={{background: '#dae0e6', height: '100vh'}}>
          <MobileScreen />
          </div>
        </Hidden>
      </Fragment>
    )
  }
}

export default MainContainer
