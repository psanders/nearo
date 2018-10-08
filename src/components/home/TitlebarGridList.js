import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import tileData from './tileData'
import Card from './Card'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
})

function SingleLineGridList(props) {
  const { classes } = props

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5} style={{padding: 10, paddingBottom: 5}}>
        {tileData.map(tile => (
          <GridListTile key={tile.img} style={{width: 110, height: 110}}>
            <Card img={tile.img}/>
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}

SingleLineGridList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SingleLineGridList)
