import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import PhoneIcon from '@material-ui/icons/ContactPhone'
import ContentLoader from 'react-content-loader'

function ProfileCard(props) {
  const { classes, user } = props
  const avatar = user.picture
    ? user.picture
    : "/images/default-avatar.png"

  const mockContent = () => {
    return <ContentLoader height={150}>
    <rect x="0" y="10" rx="0" ry="0" width="200" height="25" />
    <rect x="0" y="50" rx="0" ry="0" width="380" height="10" />
    <rect x="0" y="70" rx="0" ry="0" width="400" height="10" />
    <rect x="0" y="90" rx="0" ry="0" width="340" height="10" />
    <rect x="0" y="110" rx="0" ry="0" width="380" height="10" />
  </ContentLoader>
  }

  const joined = (date) => date.getUTCFullYear() + '/' + date.getUTCMonth()

  const showPhone = (user) =>
    user.phone &&
    user.phone.trim().length > 0
    && !user.keepPhonePrivate

  const realContent = (user, classes) => {
    return <div>
      <Typography variant="title" gutterBottom>
        { user.name }
      </Typography>
      {user.bio && <Typography variant="body1" gutterBottom>
        { user.bio }
      </Typography>
      }
      {
        showPhone(user) &&
        <div className={classes.phone}>
          <PhoneIcon className={ classes.phoneIcon }/>
          <Typography variant="body2" gutterBottom>
            { user.phone }
          </Typography>
        </div>
      }
      <Typography variant="caption">
        Joined { joined(user.joined.toDate()) }
      </Typography>
    </div>
  }

  return (
    <Card elevation={0} className={classes.card}>
      <CardContent>
        <div className={classes.row}>
          <Avatar
            alt={ user.name }
            src={ avatar }
            className={classes.avatar}
          />
        </div>
        <div className={classes.content}>
          { user.name ? realContent(user, classes) : mockContent() }
        </div>
      </CardContent>
    </Card>
  )
}

ProfileCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

const styles = theme => ({
  card: {
    borderRadius: 0,
    maxHeight: 313
  },
  content: {
    paddingTop: 10
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: 10,
    border: '2px solid ' + theme.palette.secondary.main,
    width: 80,
    height: 80,
  },
  phoneIcon: {
    fontSize: 18,
    marginTop: 3,
    marginRight: 5,
    color: theme.palette.secondary.main
  },
  phone:{
    display: 'flex',
    marginTop: 4
  }
})

export default withStyles(styles)(ProfileCard)
