import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
import HomeIcon from '@material-ui/icons/Explore'
import ArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
})

@inject('routing')
@observer
class Categories extends React.Component {
  state = {
    checked: ['wifi'],
  }

  handleToggle = value => () => {
    const { checked } = this.state
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    this.setState({
      checked: newChecked,
    })
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <List dense={true}>
          <ListItem onClick={() => this.props.routing.push('/explore')}>
            <ListItemIcon>
              <HomeIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Begin Exploring Nearo"
              secondary="Buy or sell anything. From cars to houses and anything in between" />
            <ListItemSecondaryAction>
              <Button>
                <ArrowRightIcon />
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </div>
    )
  }
}

Categories.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Categories)
