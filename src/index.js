import React from 'react'
import 'babel-polyfill' // This helps Googlebot to properly render the pages
import './index.css'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from "mobx-react"
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import { Router } from 'react-router'

import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { appStore } from './stores/app'
import { navStore } from './stores/navigation'
import { postsStore } from './stores/posts'
import { bookmarksStore } from './stores/bookmarks'
import { usersStore } from './stores/users'
import { notificationsStore } from './stores/notifications'

const browserHistory = createBrowserHistory()
const routingStore = new RouterStore()

// Not very elegant but it works...
notificationsStore.push = routingStore.push

const stores = {
  routing: routingStore,
  appStore: appStore,
  navStore: navStore,
  postsStore: postsStore,
  notificationsStore: notificationsStore,
  usersStore: usersStore,
  bookmarksStore: bookmarksStore
}

const history = syncHistoryWithStore(browserHistory, routingStore)

ReactDOM.render(
  <HelmetProvider>
    <Provider {...stores}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </HelmetProvider>,
document.getElementById('root'))
registerServiceWorker()
