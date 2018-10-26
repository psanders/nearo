import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import PhoneIcon from '@material-ui/icons/ContactPhone'
import Moment from 'react-moment'

function ProfileCard(props) {
  const { classes, user, gutterBottom } = props

  if (!user.name) return null

  const avatar = user.picture ? user.picture : "/images/user.svg"

  const showPhone = (u) => u.phone && u.phone.trim().length > 0 && !u.keepPhonePrivate

  const cardContent = (user, classes) => {
    return <div>
      <Typography variant="h6" gutterBottom>
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
        Joined <Moment format="MMMM, YYYY" date={user.joined.toDate()} />
      </Typography>
    </div>
  }

  return <Card elevation={0} className={classes.card} style={{marginBottom: gutterBottom ? gutterBottom : 10}}>
    <CardContent>
      <div className={classes.row}>
        <Avatar
          alt={ user.name }
          src={ avatar }
          className={classes.avatar}
        />
      </div>
      <div className={classes.content}>
        { cardContent(user, classes) }
      </div>
    </CardContent>
  </Card>
}

ProfileCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

const styles = theme => ({
  card: {
    borderRadius: 0,
    maxHeight: 313,
    minWidth: 300
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
