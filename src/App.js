import React, { Component } from 'react';
import './App.css';
import MainContainer from './components/MainContainer';
import { Route } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { getCurrentLocation } from './components/locator/dbfunctions';

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
      currentLocation: null
    };
    getCurrentLocation().then(loc => {
      if(loc) {
        this.setState({currentLocation: loc});
      } else {
        this.setState({currentLocation: "Everywhere"});
      }
    }).catch(err => {
      console.log(err);
      this.setState({currentLocation: "Everywhere"});
    })
  }

  render() {
    return (
      <div className="App">
          <MuiThemeProvider theme={theme}>
            <Route exact path='/' component={MainContainer} />
          </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
