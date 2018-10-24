import React from 'react'
import Typography from '@material-ui/core/Typography'

const style = {
  root: {
    backgroundImage: "url('/images/location.svg')",
    backgroundPosition: 'right 10px top 15px',
    backgroundSize: '20%',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#ff5959',
    minHeight: 75,
    padding: 10,
    width: '100%'
  }
}

const ShareBanner = props => <div style={ style.root }>
  <Typography component="h2" variant="subtitle1" style={{color: '#fff'}}>
    Buy & Sell Locally
  </Typography>
  <Typography component="h3" variant="caption" style={{color: '#fff'}}>
    Share a post with people close to you
  </Typography>
</div>


export default ShareBanner
