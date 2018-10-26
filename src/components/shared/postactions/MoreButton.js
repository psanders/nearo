import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import SoldOutIcon from '@material-ui/icons/MonetizationOn'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { withStyles } from '@material-ui/core/styles'

import { styles } from './PostCardStyles'

class MoreButton extends React.Component {
  state = {
    anchorEl: null,
  }

  handleClick = e => {
    e.stopPropagation()
    this.setState({ anchorEl: e.currentTarget })
  }

  handleClose = (e) => {
    e.stopPropagation()
    this.setState({ anchorEl: null })
  }

  render() {
    const { anchorEl } = this.state
    const { classes, post } = this.props

    return (
      <span>
        <Button
          className={classes.actionBtn}
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={(e) => {
            e.stopPropagation()
            this.setState({ anchorEl: e.currentTarget })
          }}
        >
          <MoreHorizIcon className={classes.actionIcon}/>
            <Typography variant="caption" color="textSecondary">More</Typography>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={e => {
            e.stopPropagation()
            this.setState({ anchorEl: null })}
          }
        >
          <MenuItem onClick={ e => {
              e.stopPropagation()
              this.props.onDelete(post)
          }}>
            <DeleteIcon className={ classes.actionIcon }/>
            <Typography variant="caption">
              Remove
            </Typography>
          </MenuItem>
          <MenuItem onClick={ e => {
            e.stopPropagation()
            this.props.onMarkSold(post)
          }}>
            <SoldOutIcon className={classes.actionIcon}/>
            <Typography variant="caption">
              { !post.sold && "Sold"  }
              { post.sold && "Unsold" }
            </Typography>
          </MenuItem>
        </Menu>
      </span>
    )
  }
}

export default withStyles(styles)(MoreButton)
