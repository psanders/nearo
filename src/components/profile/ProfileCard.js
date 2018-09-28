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
    return <ContentLoader height={140}>
    <rect x="0" y="10" rx="0" ry="0" width="200" height="25" />
    <rect x="0" y="55" rx="0" ry="0" width="380" height="15" />
    <rect x="0" y="80" rx="0" ry="0" width="400" height="15" />
    <rect x="0" y="105" rx="0" ry="0" width="340" height="15" />
    <rect x="0" y="130" rx="0" ry="0" width="380" height="15" />
    <rect x="0" y="166" rx="0" ry="0" width="150" height="20" />
    <rect x="0" y="200" rx="0" ry="0" width="100" height="15" />
  </ContentLoader>
  }

  const realContent = (user, classes) => {
    return <div>
      <Typography variant="title" gutterBottom>
        { user.name }
      </Typography>
      <Typography variant="body1" gutterBottom>
        { user.bio }
      </Typography>
      {
        !user.keepPhonePrivate &&
        <div className={classes.phone}>
          <PhoneIcon className={ classes.phoneIcon }/>
          <Typography variant="body2" gutterBottom>
            { user.phone }
          </Typography>
        </div>
      }
      <Typography variant="caption">
        { user.username }
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
