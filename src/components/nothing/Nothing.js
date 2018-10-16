import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { observer, inject } from 'mobx-react'

@inject('appStore')
@observer
class NoMatch extends Component {

  handleClick = () => this.props.appStore.currentView = '/'

  render () {
    const props = this.props
    const { classes } = props

    return (<div className={classes.root}>
      <div className={classes.row}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary">
              Nothing yet
            </Typography>
            <Typography variant="title" component="h3">
              Favorite Posts
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              No liked post
            </Typography>
            <Typography component="p">
            All your liked posts will appear
              <br />
            here.
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={this.handleClick} size="small" variant="outlined" color="primary">Go Home</Button>
          </CardActions>
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
