import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import PlacesAutocomplete from 'react-places-autocomplete'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import EllipsisText  from 'react-ellipsis-text'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  searchInput: {
    fontSize: 12,
    width: 'calc(100% - 40px)',
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 5,
    padding: 5,
    border: '1px solid #cdcdcd',
    '&:focus': {
      outline: 'none !important',
      border: '1px solid #444',
    },
  },
  everywhereBtn: {
    backgroundColor: '#fff',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#fafafa',
      cursor: 'pointer'
    },
  }
})

class LocationSearchInput extends React.Component {
  state = { address: '' }

  handleChange = address => this.setState({ address })

  handleSelect = (fullAddress) => {
    if (fullAddress.target) {
      this.props.onSelect('Anywhere')
    } else {
      this.props.onSelect(fullAddress)
    }
  }

  getInputItems = (getSuggestionItemProps, suggestions) => {
    return suggestions.map(suggestion => {
      const className = suggestion.active
        ? 'suggestion-item--active'
        : 'suggestion-item'

      const style = suggestion.active
        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
        : { backgroundColor: '#ffffff', cursor: 'pointer' }

      return (
        <ListItem
          {...getSuggestionItemProps(suggestion, {
            className,
            style,
          })}
          key={suggestion.description} button>

          <ListItemText
            primary={<EllipsisText text={suggestion.description} length={30} />}
            />
        </ListItem>
      )
    })
  }

  getDefaultItem = () => {
      return (
        <ListItem
          onClick={this.handleSelect}
          className={this.props.classes.everywhereBtn}
          key="Everywhere"
          button>
          <ListItemText primary={"Everywhere"} />
        </ListItem>
      )
  }

  render() {
    const { classes, showDefaultItem } = this.props
    return (
      <PlacesAutocomplete
        className={classes.root}
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: classes.searchInput,
              })}
            />
            <List dense={true} className="autocomplete-dropdown-container">
              {loading && <p style={{fontSize: 12, marginLeft: 20}}>Loading...</p>}
              {showDefaultItem && this.getDefaultItem()}
              {this.getInputItems(getSuggestionItemProps, suggestions)}
              <div style={{width: '100%', height: '12px'}}>
                <img alt="Powered by Google" style={{float: 'right', marginRight: 12}} height="10px" src="./powered_by_google_default.png"/>
              </div>
            </List>
          </div>
        )}
      </PlacesAutocomplete>
    )
  }
}

LocationSearchInput.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LocationSearchInput)
