import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { observer, inject } from 'mobx-react'

@inject('routing')
@observer
class NothingPage extends Component {
  handleClick = () => this.props.routing.push('/')

  render () {
    const { classes } = this.props

    return <div className={classes.root}>
      <div className={classes.container}>
        <img alt="" style={{width: '150px'}} src="/images/open-box.png" />
        <div>
          <Button className={classes.btn} onClick={this.handleClick} size="small" variant="outlined" color="primary">Go Home</Button>
        </div>
      </div>
    </div>
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 110px)'
  },
  container: {
    maxWidth: 150,
  },
  btn: {
    width: '100%',
    marginTop: theme.spacing.unit * 2
  }
})

NothingPage.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NothingPage)
