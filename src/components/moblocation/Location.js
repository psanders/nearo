import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { observer, inject } from 'mobx-react'
import { computed } from 'mobx'

import Locator from '../locator/Locator'

@inject('appStore')
@inject('navStore')
@observer
class NoMatch extends Component {
  @computed get address() {
    return this.props.navStore.navInfo.locInfo.address
  }

  handleClick = () => this.props.appStore.currentView = '/'

  render () {
    const props = this.props
    const { classes } = props

    return (<div className={classes.root}>
      <div className={classes.row}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary">
              Select a location
            </Typography>
            <Locator address="USA" withBorder withWith={265} address={this.address} name="gobal-location"/>
            <br />
            <Typography component="p">
            This is use to show you content
              <br />
            relevant to your area.
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>)
  }
}

const styles = {
  root: {
    height: 'calc(100vh - 55px)',
    display: 'flex',
  },
  row: {
    margin: 'auto',
  },
  card: {
    margin: 'auto',
    width: 300,
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
