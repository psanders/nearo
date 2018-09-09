import React, { Component } from 'react';
import './App.css';
import MainContainer from './components/MainContainer';
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
      console.log("result", loc);
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
            { this.state.currentLocation &&
                <MainContainer currentLocation={this.state.currentLocation}/>
            }
          </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
