import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import ScreenSwitch from './screens/ScreenSwitch'
import './App.css'

const theme = createMuiTheme({
  overrides: {
    MuiSnackbarContent: {
      message: {
        padding: 0,
      },
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  palette: {
    primary: {
      a50: '#E3F2FD',
      main: '#484ec2',
    },
    secondary: {
      main: '#616161',
    },
    accent: {
      main: '#FFC400',
      light: '#FFD740'
    }
  },
})

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <ScreenSwitch />
        </MuiThemeProvider>
      </div>
    )
  }
}

export default App
