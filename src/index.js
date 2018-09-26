import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "mobx-react";
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { accountStore } from './components/stores/account'
import { navStore } from './components/stores/navigation'
import { postsStore } from './components/stores/posts'
import { bookmarksStore } from './components/stores/bookmarks'
import { usersStore } from './components/stores/users'
import { notificationsStore } from './components/stores/notifications'

ReactDOM.render(
  <BrowserRouter>
    <Provider navStore={navStore}
      accountStore={accountStore}
      postsStore={postsStore}
      notificationsStore={notificationsStore}
      usersStore={usersStore}
      bookmarksStore={bookmarksStore}
      >
      <App />
    </Provider>
  </BrowserRouter>,
document.getElementById('root'));
registerServiceWorker();
