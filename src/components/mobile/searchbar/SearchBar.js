import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import classenames from 'classnames'

import { ellip } from 'components/commons/utils'
import { styles } from './styles'

@inject('navStore')
@inject('routing')
@inject('postsStore')
@observer
class SubBar extends Component {

  handleChange = name => event => {
    const navInfo = this.props.navStore.navInfo
    navInfo.searchTerm = event.target.value
    this.props.navStore.setNavInfo(navInfo)
    this.props.routing.push('/explore')
  }

  handleSearch = () => {
    const result = this.props.postsStore.nbHits
      + (this.props.postsStore.nbHits === 1 ? "result" : "results")
      + " nearby " + ellip(this.props.navStore.navInfo.locInfo.address, 30)
    console.log('result', result)
  }

  render() {
    const { classes, navStore} = this.props

    return (
      <Fragment>
        <div className={ classes.search }>
          <div className={ classes.searchIcon }>
            <SearchIcon />
          </div>
          <TextField
            type="search"
            className={classenames(classes.inputInput)}
            placeholder="Search Nearo"
            value={ navStore.navInfo.searchTerm }
            onChange={ this.handleChange('searchInput') }
            InputProps={{
              disableUnderline: true,
              style:{color: 'inherit'},
              inputProps:{
                "aria-label" : "Search Field"
              }
            }}
          />
        </div>
      </Fragment>
    )
  }
}

SubBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SubBar)
