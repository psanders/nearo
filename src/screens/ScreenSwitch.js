import React, { Component, Fragment} from 'react'
import Hidden from '@material-ui/core/Hidden'
import { observer, inject } from 'mobx-react'
import Helmet from 'react-helmet-async'
import Typography from '@material-ui/core/Typography'
import Loadable from 'react-loadable'

import MobileScreen from './mobile/mobile'

const loading = <Typography variant="body1" color="secondary" style={{ margin: 20 }}>
  Loading...
</Typography>

const DesktopScreen = Loadable({
  loader: () => import('./desktop/desktop'),
  loading: () => loading,
})

@inject('routing')
@inject('appStore')
@observer
class MainContainer extends Component {

  render () {
    const { routing } = this.props
    const doChangeTitle = route => route === '/' || route === '/explore'
    const title = route => doChangeTitle(route) ?  "Buy, sell, and trade locally | Nearo" : "Nearo"

    return(
      <Fragment>
        { doChangeTitle(routing.location.pathname) &&
          <Helmet>
            <title>
              { title(routing.location.pathname)}
            </title>
          </Helmet>
        }
        <Hidden xsDown={true}>
          <DesktopScreen />
        </Hidden>
        <Hidden smUp={true}>
          <div style={{height: '100vh'}}>
            <MobileScreen />
          </div>
        </Hidden>
      </Fragment>
    )
  }
}

export default MainContainer
