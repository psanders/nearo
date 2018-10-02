import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from "mobx-react";
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker'
import { appStore } from './components/stores/app'
import { navStore } from './components/stores/navigation'
import { postsStore } from './components/stores/posts'
import { bookmarksStore } from './components/stores/bookmarks'
import { usersStore } from './components/stores/users'
import { notificationsStore } from './components/stores/notifications'

ReactDOM.render(
  <HelmetProvider>
    <BrowserRouter>
      <Provider
        appStore={appStore}
        navStore={navStore}
        postsStore={postsStore}
        notificationsStore={notificationsStore}
        usersStore={usersStore}
        bookmarksStore={bookmarksStore}
        >
        <App />
      </Provider>
      </BrowserRouter>
  </HelmetProvider>,
document.getElementById('root'));
registerServiceWorker();
