import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ListSubheader from '@material-ui/core/ListSubheader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import EventsIcon from '@material-ui/icons/Event'
import ServicesIcon from '@material-ui/icons/Build'
import HomeIcon from '@material-ui/icons/Home'
import CarIcon from '@material-ui/icons/DirectionsCar'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
})

class MainCategories extends React.Component {

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <List
          component="nav"
          subheader={<ListSubheader component="div">Categories</ListSubheader>}
        >
          <ListItem button onClick={() => this.props.onCategoryChange({name: 'Cars'})}>
            <ListItemIcon>
              <CarIcon color="primary"/>
            </ListItemIcon>
            <ListItemText inset primary="Cars" />
          </ListItem>
          <ListItem button onClick={() => this.props.onCategoryChange({name: 'Housing'})}>
            <ListItemIcon>
              <HomeIcon color="primary"/>
            </ListItemIcon>
            <ListItemText inset primary="Housing" />
          </ListItem>
          <ListItem button onClick={() => this.props.onCategoryChange({name: 'Services'})}>
            <ListItemIcon>
              <ServicesIcon color="primary"/>
            </ListItemIcon>
            <ListItemText inset primary="Services" />
          </ListItem>
          <ListItem button onClick={() => this.props.onCategoryChange({name: 'Events'})}>
            <ListItemIcon>
              <EventsIcon color="primary"/>
            </ListItemIcon>
            <ListItemText inset primary="Events" />
          </ListItem>
        </List>
      </div>
    )
  }
}

MainCategories.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MainCategories)
