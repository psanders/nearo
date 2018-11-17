import React, { Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'
import classenames from 'classnames'
import { observer, inject } from 'mobx-react'

@inject('routing')
@inject('notificationsStore')
@observer
class LoginNotification extends Component {

  handleClose = () => {
    this.props.notificationsStore.hideLoginNotification = true
    this.props.onClose()
    // Send event to GA
  }

  letsDoIt = () => {
    this.props.routing.push('/login')
    this.handleClose()
    window.gtag('event', 'accepted-signup-prompt', {
      'event_category': 'Engagement',
      'event_label': 'Accepted Auth Prompt'
    })
    window.fbq('trackCustom', 'accepted-signup-prompt')
  }

  render () {
    const { classes } = this.props

    return (
      <SnackbarContent
        className={ classes.root }
        aria-describedby="client-snackbar"
        message={
          <Fragment>
            <span id="client-snackbar" className={classes.header}>
              <div className={classes.headerContent}>
                <img alt="" className={classenames(classes.brandIcon, classes.leftIcon)} src="/images/icons/search.svg" />
                <img alt="" className={classenames(classes.brandIcon, classes.rightIcon)} src="/images/icons/facebook.svg" />
                <Typography variant="body1" className={classes.headerLabel}>
                  Continue with Google or Facebook
                </Typography>
                <span className={classes.flex} />
                <CloseIcon onClick={this.handleClose} fontSize="small" className={classes.iconClose}/>
              </div>
            </span>
            <Divider />
            <div className={ classes.content }>
              <Button onClick={ this.letsDoIt } className={ classes.signupBtn } size="small" variant="contained">
                Continue
              </Button>
              <Typography variant="caption" className={classes.headerLabel}>
                Login or Signup to begin posting and enjoying other features. By continuing, you agree with {"Nearo's"} <a href="/about" className={classes.link}>privacy policy</a> and <a href="/about" className={classes.link}>terms of service</a>
              </Typography>
            </div>
          </Fragment>
        }
      />
    )
  }
}

LoginNotification.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
}

const styles = theme => ({
  root: {
    padding: 0,
    width: '100%',
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    width: '100%'
  },
  headerContent: {
    alignItems: 'center',
    display: 'flex',
    width: '100%',
    paddingTop: 0
  },
  content: {
    alignItems: 'center',
    padding: theme.spacing.unit * 2,
    display: 'block',
    minHeight: 40
  },
  headerLabel: {
    color: 'gray',
    fontWeight: 300
  },
  iconClose: {
    color: 'gray',
    marginRight: theme.spacing.unit * 2,
    cursor: 'pointer'
  },
  flex: {
    flex: 1
  },
  brandIcon: {
    width: 18,
    height: 18,
  },
  leftIcon: {
    margin: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    margin: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit * 2
  },
  signupBtn: {
    backgroundColor: '#3e82f7',
    color: '#fff',
    marginBottom: theme.spacing.unit,
    width: '100%',
    '&:hover': {
      backgroundColor: '#5795ff',
    }
  },
  iconImage: {
    marginRight: theme.spacing.unit * 2,
    width: 20,
    border: 0,
    backgroundColor: '#fff'
  },
  link: {
    color: '#4285f4',
    '&:visited': {
      color: '#4285f4'
    }
  }
})

export default withStyles(styles)(LoginNotification)
