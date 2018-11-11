import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { storeUserInfo } from 'components/commons/dbfunctions'
import blue from '@material-ui/core/colors/blue'
import { observer, inject } from 'mobx-react'

@inject('routing')
@inject('appStore')
@observer
class WelcomeBanner extends Component {
  render() {
    const gotoRegister = () => this.props.routing.push('/login')
    const style = {
      root: {
        backgroundColor: '#f5f5f5',
        borderRadius: 0,
        paddingBottom: 35
      },
      fonts: {
        title: {
          marginLeft: 10,
          fontFamily: 'Bitter',
        },
        subtitle: {
          marginLeft: 10,
          marginBottom: 20,
          fontWeight: 300,
        }
      },
      buttonsContainer: {
        marginTop: 10,
        marginBottom: 5,
      },
      button: {
        width: 100,
        marginRight: 10,
        backgroundColor: blue[300],
        borderRadius: 0,
        color: '#fff'
      },
      registerBtn: {
        width: 100,
        marginRight: 10,
        borderRadius: 0,
        border: '2px solid ' + blue[300],
        color: blue[300]
      },
      closeBtn: {
      },
    }

    const close = () => {
      this.props.appStore.closeIntroBanner()
      storeUserInfo('closed-intro-banner', true)
    }

    return <Paper style={style.root}>
      <div style={{display: 'flex', width: '100%'}}>
        <span style={{flex: 1}} />
        <IconButton onClick={ () => close() } aria-label="Close" style={style.closeBtn}>
          <CloseIcon />
        </IconButton>
      </div>
      <div style={{textAlign: 'center'}}>
        <Typography style={style.fonts.title} color="primary" component="h1" variant="h5" >
          Buy Sell or Trade Locally
        </Typography>
        <Typography component="h2" variant="h6" color="textSecondary" style={style.fonts.subtitle} >
          Search for jobs, housing, events, services, community, and more.
        </Typography>
        <div style={style.buttonsContainer}>
          <Button onClick={ () => gotoRegister()} style={style.button} variant="text" size="large">
            Register
          </Button>
          <Button onClick={ () => gotoRegister()} style={style.registerBtn} variant="text" size="large">
            Sign In
          </Button>
        </div>
        <Typography variant="caption" gutterBottom>
          Make the most out of Nearo. Register Today!
        </Typography>
      </div>
    </Paper>
  }
}

export default WelcomeBanner
