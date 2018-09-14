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
        light: '#FFFF00',
        main: '#FFEA00'
      }
    },
})

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      loading: false,
      userInfo: null
    }
  }

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
