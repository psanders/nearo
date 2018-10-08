import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'
import HomeIcon from '@material-ui/icons/Home'
import CardTravelIcon from '@material-ui/icons/CardTravel'
import ForSaleIcon from '@material-ui/icons/Loyalty'
import ServiceIcon from '@material-ui/icons/Store'
import LostFoundIcon from '@material-ui/icons/NotListedLocation'
import EventsIcon from '@material-ui/icons/CalendarToday'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    background: '#fff'
  },
  chip: {
    margin: theme.spacing.unit,
  },
})

function handleDelete() {
  alert('You clicked the delete icon.') // eslint-disable-line no-alert
}

function handleClick() {
  alert('You clicked the Chip.') // eslint-disable-line no-alert
}

function Chips(props) {
  const { classes } = props
  return (
    <div className={classes.root}>
      <Chip avatar={<Avatar><HomeIcon /></Avatar>} label="Realestate" className={classes.chip} />
      <Chip avatar={<Avatar><ServiceIcon /></Avatar>} label="Services" className={classes.chip} />
      <Chip avatar={<Avatar><CardTravelIcon /></Avatar>} label="Jobs" className={classes.chip} />
      <Chip avatar={<Avatar><ForSaleIcon /></Avatar>} label="For Sales" className={classes.chip} />
      <Chip avatar={<Avatar><CardTravelIcon /></Avatar>} label="For Rent" className={classes.chip} />
      <Chip avatar={<Avatar><LostFoundIcon /></Avatar>} label="Lost & Found" className={classes.chip} />
      <Chip avatar={<Avatar><EventsIcon /></Avatar>} label="Events" className={classes.chip} />
    </div>
  )
}

Chips.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Chips)
