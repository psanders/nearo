import React, { Component } from 'react';
import './App.css';
import MainContainer from './components/MainContainer';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { showCurrentLocation } from './geocoder/geocoder'

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

  constructor(props) {
      super(props)
      this.state = {
          currentLocation: 'Everywhere',
          mounted: false,
          user: null
      }
  }

  componentDidMount() {
    showCurrentLocation()
    .then(geoInfo => {
      console.log('geo: ' + geoInfo);
      this.setState({currentLocation: geoInfo.city + ', ' + geoInfo.state})
      this.setState({mounted: true})
    })
  }

  render() {
    return (
      <div className="App">
          <MuiThemeProvider theme={theme}>
              { !this.state.mounted && <LinearProgress />}
              { this.state.mounted
                && <MainContainer currentLocation={this.state.currentLocation}/>
              }
          </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
