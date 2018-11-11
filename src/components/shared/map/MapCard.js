import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import MarkerIcon from '@material-ui/icons/Place'
import GoogleMapReact from 'google-map-react'

function MapCard(props) {
  const { classes, center, height } = props

  if(!center) return null

  const MapMarker = () => <MarkerIcon className={classes.marker} />

  const defaultCenter = {
    lat: 37.09024,
    lng: -95.71289100000001
  }

  return (
    <Card elevation={0} className={classes.card} style={{height: height? height: ''}}>
      <CardContent className={classes.cardContent}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBJWWg7cJV5835KCpmNsG2D2UwBbs0EY9Y" }}
          defaultCenter={defaultCenter}
          center={center}
          defaultZoom={8}
        >
          <MapMarker lat={center.lat} lng={center.lng} />
        </GoogleMapReact>
      </CardContent>
    </Card>
  )
}

MapCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

const styles = theme => ({
  card: {
    height: 270,
    borderRadius: 0,
    minWidth: 300
  },
  cardContent: {
    padding: 0,
    height: 270
  },
  marker: {
    color: theme.palette.secondary.main,
    fontSize: 40
  }
})

export default withStyles(styles)(MapCard)
