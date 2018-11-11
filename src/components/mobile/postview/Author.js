import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Moment from 'react-moment'

function ProfileCard(props) {
  const { classes, user } = props

  if (!user.name) return null

  const avatar = user.picture ? user.picture : "/images/user.svg"

  const cardContent = (user, classes) => {
    return <div>
      <Typography variant="subtitle1">
        { user.name }
      </Typography>
      <Typography variant="caption">
        Joined <Moment format="MMMM, YYYY" date={user.joined.toDate()} />
      </Typography>
    </div>
  }

  return <div>
      <div className={classes.row}>
        <Avatar
        alt={ user.name }
        src={ avatar }
        className={classes.avatar}
      />
      <div className={classes.content}>
        { cardContent(user, classes) }
      </div>
    </div>

  </div>
}

ProfileCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

const styles = theme => ({
  content: {
    paddingTop: 10
  },
  row: {
    display: 'flex',
  },
  avatar: {
    margin: 10,
    width: 52,
    height: 52,
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
