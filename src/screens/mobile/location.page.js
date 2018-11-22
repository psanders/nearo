import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import { computed } from 'mobx'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import GoBackPage from 'components/shared/gobackpage/GoBackPage'
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

    return <GoBackPage
      dense
      children={<div className={classes.root}>
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
    </div>}
    />
  }
}

const styles = {
  root: {
    minHeight: 'calc(100vh - 49px)',
    display: 'flex',
    backgroundColor: '#fff'
  },
  container: {
    margin: 20,
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
