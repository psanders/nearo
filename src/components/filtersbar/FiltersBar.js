import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { getCategories } from '../commons/categories'

const styles = theme => ({
  filters: {
    backgroundColor: '#f4f4f4',
    paddingTop: 14,
    paddingLeft: 10,
    height: 42
  },
  button: {
    marginLeft: 5,
    marginRight: 5,
    minHeight: 10,
    minWidth: 10,
    padding: 4,
    textTransform: 'capitalize',
    fontSize: 12,
    color: 'gray'
  }
})

function FiltersBar(props) {
  const { classes } = props

  return (
    <div className={classes.filters} style={{width: '100hv', overflow: 'scroll'}}>
      <div style={{width: 450}}>
        <span style={{color: 'gray', marginRight: 10, fontSize: 12}}>Filters:</span>
        {
          getCategories().map(category => {
            return (
              <Button key={category.ref} onClick={ () => props.onChangedFilter(category.ref) } className={classes.button} variant="outlined">{ category.name }</Button>
            )
          })
        }
      </div>
    </div>
  )
}

FiltersBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(FiltersBar)
