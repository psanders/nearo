import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import { observer, inject } from 'mobx-react'

import MainCategories from './MainCategories'
import { getCategories } from 'components/commons/categories'

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 2,
    maxWidth: 280,
    borderRadius: 0
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderRight: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    height: 100,
    minWidth: 350,
    marginRight: 20
  },
  helperContainer: {
    backgroundImage: "url('/images/location.svg')",
    backgroundPosition: 'right 10px top 15px',
    backgroundSize: '20%',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#ff5959',
    padding: 10,
    minHeight: 75,
    width: '100%'
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  postpanelSpacing: {
    marginRight: theme.spacing.unit
  },
  category: {
    cursor: 'pointer'
  }
})

@inject('navStore')
@inject('routing')
@observer
class DetailedExpansionPanel extends Component {

  render () {
    const { classes, routing, navStore } = this.props

    const handleChange = category => {
      const navInfo = navStore.navInfo
      navInfo.searchTerm = category.name
      navStore.setNavInfo(navInfo)
      routing.push('/explore')
    }

    const categories = <div>
      {
        getCategories().map(category => {
         return (
          <Typography
            style={{margin: 5}}
            key={ category.ref }
            onClick={() => handleChange(category)}
            variant="body1"
            className={classes.category}
            >
           { category.name }
          </Typography>
          )
        })
      }
    </div>

    return (<Paper elevation={0} className={classes.root}
    >
      <MainCategories onCategoryChange={category => handleChange(category)}/>
      <Divider />
      <div style={{padding: 10, paddingLeft: 20}}>
        <Typography variant="body1">
          More
        </Typography>
        { categories }
      </div>
    </Paper>)
  }
}

DetailedExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DetailedExpansionPanel)
