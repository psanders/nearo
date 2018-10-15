import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import HomeIcon from '@material-ui/icons/Home'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ProfileIcon from '@material-ui/icons/Person'
import EditLocationIcon from '@material-ui/icons/EditLocation'
import { observer, inject } from 'mobx-react'

@inject('appStore')
@observer
class BNav extends React.Component {
  state = {
    value: '/',
  }

  handleChange = (event, value) => {
    console.log('value', value)
    this.props.appStore.currentView = value
    //this.props.history.push(value)
    this.setState({value: value})
  }

  render() {
    const { classes } = this.props
    const { value } = this.state

    return (
      <BottomNavigation value={value} onChange={this.handleChange} className={classes.root}>
        <BottomNavigationAction value="/" icon={<HomeIcon />}  />
        <BottomNavigationAction value="/favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction value="/location" icon={<EditLocationIcon />} />
        <BottomNavigationAction value="/profile" icon={<ProfileIcon />}  />
      </BottomNavigation>
    )
  }
}

BNav.propTypes = {
  classes: PropTypes.object.isRequired,
}

const styles = {
  root: {
    width: '100vw',
    position: 'fixed',
    top: 'calc(100vh - 55px)'
  },
}

export default withStyles(styles)(BNav)
