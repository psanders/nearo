import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { observer, inject } from 'mobx-react'
import { computed } from 'mobx'

import Locator from 'components/shared/locator/Locator'

@inject('routing')
@inject('navStore')
@observer
class NoMatch extends Component {
  @computed get address() {
    return this.props.navStore.navInfo.locInfo.address
  }

  handleClick = () => this.props.routing.push('/')

  render () {
    const props = this.props
    const { classes } = props

    return (<div className={classes.root}>
      <div className={classes.container}>
        <Typography className={classes.title} color="textSecondary">
          Select a location
        </Typography>
        <Locator withBorder="1px solid #616161" withWidth={'100vw'} address={this.address} name="gobal-location"/>
        <br />
        <Typography component="p">
        This is use to show you content
          <br />
        in your area.
        </Typography>
      </div>
    </div>)
  }
}

const styles = {
  root: {
    height: '100vh',
    display: 'flex',
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}

NoMatch.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NoMatch)
