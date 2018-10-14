import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'

import { ellip } from '../commons/utils'
import { styles } from './SubBarStyles'

@inject('navStore')
@inject('postsStore')
@observer
class SubBar extends Component {

  componentDidMount() {
    this.props.navStore.navInfo.searchTerm = ''
  }

  handleChange = name => event => {
    const navInfo = this.props.navStore.navInfo
    navInfo.searchTerm = event.target.value
    this.props.navStore.setNavInfo(navInfo)
  }

  handleSearch = () => {
    const result = this.props.postsStore.nbHits
      + (this.props.postsStore.nbHits === 1 ? "result" : "results")
      + " nearby " + ellip(this.props.navStore.navInfo.locInfo.address, 30)
    console.log('result', result)
  }

  render() {
    const { classes } = this.props

    return (
      <Fragment>
        <Toolbar className={classes.filters}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search Nearo"
              value={this.props.navStore.navInfo.searchTerm}
              onChange={this.handleChange('searchInput')}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
        </Toolbar>
      </Fragment>
    )
  }
}

SubBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SubBar)
