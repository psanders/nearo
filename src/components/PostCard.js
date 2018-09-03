import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/BookmarkBorder';
import ShareIcon from '@material-ui/icons/QuestionAnswer';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Moment from 'react-moment';
import Linkify from 'react-linkify';
import {getCategory} from './categories';

const styles = theme => ({
  card: {
    display: 'flex',
    borderColor: 'gray'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    minWidth: 560,
    minHeight: 300,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit + 5,
    paddingBottom: 8
  },
  button: {
    textTransform: 'Capitalize',
    fontSize: 12,
    color: 'gray',
    marginRight: 2
  },
  icon: {
    color: 'gray',
    marginRight: 8,
    fontSize: 20
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  avatar: {
    width: 25,
    height: 25
  },
  header: {
    padding: 0
  },
  chip: {
    margin: theme.spacing.unit,
  },
});

function PostCard(props) {
  const { classes, post } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}  elevation={0}>

        <div className={classes.details}>
          <CardContent className={classes.content}>
          <CardHeader className={classes.header}
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                  <img alt="Avatar" src={getCategory(post.category).image} width="25"/>
              </Avatar>
            }
            title={
                <Typography variant="body2">c/{ post.category } <span style={{color: 'gray', fontSize: '12px', fontWeight: 'normal'}}> {bull} Post by {post.author.split('@')[0]} <Moment fromNow={true} interval={30000}>{post.timestamp}</Moment></span></Typography>
            }
          />

            <br />
            { post.image &&
              <Typography component="p" style={{marginBottom: 10}}>
                <Linkify>{ post.body }</Linkify>
              </Typography>
            }
            {! post.image &&
              <Typography component="p">
                <Linkify>{ post.body }</Linkify>
              </Typography>
            }

            {post.image &&
              <CardMedia
                className={classes.cover}
                image={post.image}
                title="Live from space album cover">
                {post.price && <Chip
                  avatar={
                    <Avatar>
                      <MoneyIcon />
                    </Avatar>
                  }
                  label={post.price}
                  className={classes.chip}
                  color="secondary"
                />}
              </CardMedia>
            }

          </CardContent>
          <div className={classes.controls}>
            <Button  size="small" className={classes.button}>
              <FavoriteIcon className={classes.icon}/>
              Save
            </Button>
            <Button  size="small" className={classes.button}>
              <ShareIcon className={classes.icon}/>
              Ask
            </Button>
            <Button  size="small" className={classes.button}>
              <MoreHorizIcon className={classes.icon}/>
            </Button>
          </div>
        </div>
    </Card>
  );
}

PostCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PostCard);
