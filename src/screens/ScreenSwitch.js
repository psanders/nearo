import React, { Component, Fragment} from 'react'
import Collapse from '@material-ui/core/Collapse'
import Hidden from '@material-ui/core/Hidden'
import Typography from '@material-ui/core/Typography'
import { observer, inject } from 'mobx-react'
import Helmet from 'react-helmet-async'
import Loadable from 'react-loadable'

import MobileScreen from './mobile/mobile'

const loading = <Typography variant="body1" color="textSecondary" style={{ margin: 20 }}>
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
    const { routing, appStore } = this.props
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
        <Hidden smDown={true}>
          <DesktopScreen />
        </Hidden>
        <Hidden mdUp={true}>
          <Collapse in={ appStore.isReady() }>
            <MobileScreen />
          </Collapse>
        </Hidden>
      </Fragment>
    )
  }
}

export default MainContainer
