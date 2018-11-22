import React, { Component, Fragment } from 'react'
import Loadable from 'react-loadable'
import Button from '@material-ui/core/Button'
import UpIcon from '@material-ui/icons/KeyboardArrowUp'
import { withStyles } from '@material-ui/core/styles'
import { observer, inject } from 'mobx-react'

import SimpleNotification from '../../components/shared/notifications/SimpleNotification'
import Notifier from '../../components/shared/notifications/Notifier'
import TopNav from '../../components/mobile/topnav/TopNav'
import SubNav from '../../components/mobile/subnav/SubNav'
import { getMainPath, show404, scrollTop } from '../../components/commons/utils'

const NothingPage = Loadable({ loader: () => import('./nothing.page'), loading: () => null})
const HomePage = Loadable({ loader: () => import('./home.page'), loading: () => null})
const ExplorePage = Loadable({ loader: () => import('./explore.page'), loading: () => null})
const PostPage = Loadable({ loader: () => import('./post.page'), loading: () => null})
const LocationPage = Loadable({ loader: () => import('./location.page'), loading: () => null})
const ProfilePage = Loadable({ loader: () => import('./profile.page'), loading: () => null})
const FavoritesPage = Loadable({ loader: () => import('./favorites.page'), loading: () => null})
const LoginPage = Loadable({ loader: () => import('./login.page'), loading: () => null})
const AboutPage = Loadable({ loader: () => import('./about.page'), loading: () => null})
const PostPanel = Loadable({ loader: () => import('components/shared/postpanel/PostPanel'), loading: () => null})

@inject('routing')
@inject('postsStore')
@observer
class MobileScreen extends Component {
  componentDidMount() {
    const pathname = this.props.routing.location.pathname
    if(pathname.includes('/amp')) {
      this.props.routing.push('/')
    }
  }

  render () {
    const { classes } = this.props
    const pathname = this.props.routing.location.pathname
    const hideNav = pathname => pathname === '/profile'
      || pathname === '/login'
      || pathname === '/about'
      || ('/' + getMainPath(pathname) === '/posts')
      || pathname === '/location'
      || pathname === '/favorites'
    const showUpBtn = pathname => {
      return pathname === '/explore' || pathname === '/favorites'
    }

    return <Fragment>
      { ! hideNav(pathname) &&
        <Fragment>
          <div style={{ height: 49 }}/>
          <TopNav />
          { pathname === '/explore' && <SubNav />}
        </Fragment>
      }
        { pathname === '/' && <HomePage /> }
        { pathname === '/explore'  && <ExplorePage /> }
        { pathname === '/favorites' && <FavoritesPage /> }
        { pathname === '/location' && <LocationPage /> }
        { pathname === '/profile' && <ProfilePage /> }
        { pathname === '/login' && <LoginPage /> }
        { pathname === '/about' && <AboutPage /> }
        { ('/' + getMainPath(pathname) === '/posts') && <PostPage /> }
        { show404(pathname) && <NothingPage /> }
      <Notifier />
      <SimpleNotification withExtraSpacing />
      <PostPanel hideButton={true}/>
      { showUpBtn(pathname) &&
        <Button onClick={ scrollTop } mini variant="fab" className={classes.upBtn}>
          <UpIcon />
        </Button>
      }
    </Fragment>
  }
}

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  upBtn: {
    textTransform: 'capitalize',
    color: '#fff',
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
})

export default withStyles(styles)(MobileScreen)
