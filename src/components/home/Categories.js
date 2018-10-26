import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'
import ShareBanner from '../shared/sharebanner/ShareBanner'

import PostPanel from '../postpanel/PostPanel'
import { getCategories } from '../commons/categories'

const styles = theme => ({
  root: {
    width: '100%',
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
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    height: 100,
    minWidth: 350,
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
})

function DetailedExpansionPanel(props) {
  const { classes } = props
  const categories = <div style={{minWidth: 450}}>
    {
      getCategories().map(category => {
       return (
          <Chip
            style={{margin: 5}}
            key={ category.ref }
            onClick={() => props.onCategoryChange(category)}
            label={ category.name }
            className={classes.chip} />
        )
      })
    }
  </div>

  return (
    <div className={classes.root}>
      <ExpansionPanel defaultExpanded elevation={0}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.column}>
            <Typography className={classes.heading}>Topics</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>Begin Search</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column} />
          <div className={classes.column}>
            { categories }
          </div>
          <div className={classNames(classes.column, classes.helper)}>
            <ShareBanner />
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions >
          <PostPanel />
          <span className={classes.postpanelSpacing} />
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  )
}

DetailedExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DetailedExpansionPanel)
