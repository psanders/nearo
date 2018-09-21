import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import MainContainer from './components/MainContainer'
import './App.css'

const theme = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  palette: {
      primary: {
        a50: '#E3F2FD',
        main: '#304FFE',
        contrastText: '#444',
      },
      secondary: {
        main: '#546E7A',
      },
      accent: {
        light: '#FFD740',
        main: '#FFC400'
      }
    },
})

class App extends Component {
  render() {
    return (
      <div className="App">
          <MuiThemeProvider theme={theme}>
            <MainContainer />
          </MuiThemeProvider>
      </div>
    )
  }
}

export default App
