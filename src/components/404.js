import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { observer, inject } from 'mobx-react'

@inject('routing')
@observer
class NoMatch extends Component {

  render () {
    const { classes, routing } = this.props

    return (<div className={classes.root}>
      <div className={classes.row}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary">
              Error
            </Typography>
            <Typography variant="h5">
              404
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Page Not Found
            </Typography>
            <Typography component="p">
            The page you requested could not be found.
              <br />
            Verify the URL and try again.
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => routing.push('/')} size="small" variant="outlined" color="primary">Go Home</Button>
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
    width: 400,
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
