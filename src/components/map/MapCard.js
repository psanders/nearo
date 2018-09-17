import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import MarkerIcon from '@material-ui/icons/Place'
import blue from '@material-ui/core/colors/blue'
import GoogleMapReact from 'google-map-react'

const styles = {
  card: {
    height: 270
  },
  cardContent: {
    padding: 0,
    height: 270
  },
  marker: {
    color: blue[700],
    fontSize: 40
  }
}

function MapCard(props) {
  const { classes, center } = props
  const defaultCenter = {
    lat: 37.09024,
    lng: -95.71289100000001
  }

  return (
    <Card elevation={0} className={classes.card}>
      <CardContent className={classes.cardContent}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBJWWg7cJV5835KCpmNsG2D2UwBbs0EY9Y" }}
          defaultCenter={defaultCenter}
          center={center}
          defaultZoom={8}
        >
          <MarkerIcon className={classes.marker} lat={center.lat} lng={center.lng}/>
        </GoogleMapReact>
      </CardContent>
    </Card>
  )
}

MapCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MapCard)
