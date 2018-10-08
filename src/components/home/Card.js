import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: 'cover',
  },
};

function ImgMediaCard(props) {
  const { classes, img } = props;
  return (
    <CardMedia
      alt="Contemplative Reptile"
      className={classes.media}
      height="140"
      image={img}
      title="Contemplative Reptile"
      style={{borderRadius: 5, width: 100, height: 100}}
    >
      <div style={{position: 'absolute', backgroundColor: '#fff', opacity: 0.5, width: '100%', top: '40%'}}>
        <Typography variant="caption" style={{color: '#000', padding: 2}}>
          By Nearo Team
        </Typography>
      </div>
    </CardMedia>
  );
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCard);
