import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import MarkerIcon from '@material-ui/icons/LocationOn'

const styles = theme => ({
  marker: {
    color: theme.palette.primary.main,
    fontSize: 40
  }
})

function Marker(props) {
  const { classes, latLng } = props

  return (
    <div lat={ latLng.lat } lng={ latLng.lng }>
      <MarkerIcon className={ classes.marker } />
    </div>
  )
}

Marker.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Marker)
