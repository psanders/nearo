import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {openURL} from './commons/utils';

const styles = {
  media: {
    height: 140,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function SimpleCard(props) {
  const { classes } = props;

  return (
    <Card onClick={() => openURL('https://www.pinterest.com/pin/644507396647500600/', true)} className={classes.card} elevation={0}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://s3.envato.com/files/230409093/preview%20image.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            HTML 5 Banners
          </Typography>
          <Typography component="p">
            Shop animmated HTML 5 banners. Use today a 50% discount by visiting
            our show rooms.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
