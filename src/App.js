import React, { Component } from 'react';
import './App.css';
import MainContainer from './components/MainContainer';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { fetchUserInfo } from './components/commons/dbfunctions'

const theme = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  palette: {
      primary: {
        light: '#757ce8',
        main: '#fff',
        dark: '#002884',
        contrastText: '#444',
      },
      secondary: {
        main: '#3F51B5',
      },
    },
});

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      loading: false,
      userInfo: null
    }

/*    fetchUserInfo().then(userInfo => {
      if(userInfo) {
        this.setState({userInfo: userInfo})
      } else {
        const uInfo = {
          bookmarks: []
        }
        this.setState({userInfo: uInfo});
      }
    }).catch(err => {
      console.log('err', err);
    })*/
  }

  render() {
    return (
      <div className="App">
          <MuiThemeProvider theme={theme}>
            <MainContainer/>
          </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
