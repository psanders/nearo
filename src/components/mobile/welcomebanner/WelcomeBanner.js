import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CameraIcon from '@material-ui/icons/CameraAlt'
import { observer, inject } from 'mobx-react'

@inject('routing')
@inject('appStore')
@inject('postsStore')
@observer
class WelcomeBanner extends Component {
  render() {
    const style = {
      root: {
        borderRadius: 0,
        border: '0px solid #484ec2',
        marginTop: -3,
        paddingBottom: 30,
        background: 'linear-gradient(to bottom, #484ec2, #4615b2)'
      },
      fonts: {
        title: {
          marginLeft: 10,
          fontFamily: 'Bitter',
          color: '#fff'
        },
        subtitle: {
          marginLeft: 10,
          marginBottom: 20,
          fontWeight: 300,
          color: '#fff'
        }
      },
      buttonsContainer: {
        marginTop: 10,
        marginBottom: 20,
      },
      button: {
        width: 100,
        marginRight: 10,
        borderRadius: 0,
        color: '#fff'
      },
      registerBtn: {
        width: 100,
        marginRight: 10,
        borderRadius: 0,
        border: '2px solid #fff',
        color: '#fff'
      },
      closeBtn: {
        color: '#fff'
      },
    }

    /*const close = () => {
      this.props.appStore.closeIntroBanner()
      storeUserInfo('closed-intro-banner', true)
    }*/

    return <Paper style={style.root} elevation={0}>
      {/*<div style={{display: 'flex', width: '100%'}}>
        <span style={{flex: 1}} />
        <IconButton onClick={ () => close() } aria-label="Close" style={style.closeBtn}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </div>*/}
      <div style={{textAlign: 'center', paddingTop: 20}}>
        <Typography style={style.fonts.title} color="primary" component="h1" variant="h5" >
          Buy Sell or Trade Locally
        </Typography>
        <Typography component="h2" variant="h6" color="textSecondary" style={style.fonts.subtitle} >
          From cars to houses and everything <br />in between
        </Typography>
        <div style={style.buttonsContainer}>
          <Button onClick={this.props.postsStore.openPostDialog} variant="extendedFab" color="secondary">
            Create Free Post
            <CameraIcon style={{marginLeft: 20}}/>
          </Button>
        </div>
        <a href="/explore" style={{textDecorationColor: '#fff', textDecoration: 'underline'}}>
          <Typography variant="caption" style={{color: '#F4F4F4'}} gutterBottom>
            Or begin exploring Nearo
          </Typography>
        </a>
      </div>
    </Paper>
  }
}

export default WelcomeBanner
