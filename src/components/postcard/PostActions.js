import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import FavBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavIcon from '@material-ui/icons/Favorite'
import ShareButton from './ShareButton'
import MoreButton from './MoreButton'
import { styles } from './PostCardStyles'

function PostActions(props) {
  const { classes, post, isOwner, url } = props;

  return (
    <div>
      <Button className={classes.actionBtn} onClick={props.onChangeBookmark}>
        { !post.bookmarked && <FavBorderIcon className={classes.actionIcon } /> }
        { post.bookmarked && <FavIcon className={classes.liked } /> }
        <Typography variant="caption" color="textSecondary">
          { post.bookmarked && "Unlike"  }
          { !post.bookmarked && "Like" }
        </Typography>
      </Button>
      <ShareButton url={ url } post={ post }/>
      {
        isOwner && <MoreButton
        post={ post }
        onDelete={ props.onDelete }
        onMarkSold={ props.onMarkSold }
        onNotification={ props.onNotification } />
      }
    </div>
  );
}

PostActions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostActions);
