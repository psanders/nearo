import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import BookmarkBorder from '@material-ui/icons/BookmarkBorder';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import DeleteIcon from '@material-ui/icons/Delete';
import SoldOutIcon from '@material-ui/icons/MonetizationOn';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ShareIcon from '@material-ui/icons/Share';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Moment from 'react-moment';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Linkify from 'react-linkify';
import { db } from '../commons/firebase/firebase';
import {getCategory} from '../commons/categories';

const styles = theme => ({
  card: {
    display: 'flex',
    border: '1px solid #cdcdcd',
    minHeight: 170
    /*'&:hover': {
        border: '1px solid #444',
        cursor: 'pointer'
    }*/
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
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
    color: '#5d5c5c',
    marginRight: 2
  },
  icon: {
    color: '#5d5c5c',
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
    height: 25,
    backgroundColor: '#f4f4f4',
  },
  header: {
    padding: 0
  },
  chip: {
    margin: theme.spacing.unit,
  },
});

class PostCard extends React.Component {

  state = {
    alertOpen: false,
    anchorEl: null,
    post: this.props.post
  }

  markSold(post) {
    const postRef = db.collection('posts').doc(post.id);
    const sold = !post.sold ? true : false

    // Update post
    post.sold = sold;
    this.setState({post: post});

    postRef.set({
       sold: !sold
    }, { merge: true }).then(() => {
      if(sold) {
        this.props.onNotification('Post marked as sold');
      } else {
        this.props.onNotification('Post marked as unsold');
      }
    }).catch(function(error) {
      post.sold = !sold;
      this.setState({post: post});
      console.error("Error writing document: ", error);
    });
  }

  getUsername = (email) => {
    return email? email.split('@')[0] : 'none';
  }

  uiRefreshForBookmark() {
    const post = this.state.post;
    post.bookmarked = !post.bookmarked;
    this.setState({post: post});
  }

  isSignedIn () {
    return this.props.user == null ? false : true
  }

  addBookmark = () => {
    if (!this.isSignedIn()) {
      this.props.onNotification('You must login to create a new post');
      return
    }
    const bookmarksRef = db.collection('bookmarks').doc(this.props.post.id);
    bookmarksRef.set({
      user: this.props.user.email
    }, { merge: true }).then(() => {
      this.uiRefreshForBookmark();
      this.props.onNotification('Saved');
      this.props.onBookmark();
    }).catch(function(error) {
      this.uiRefreshForBookmark();
      console.error("Error writing document: ", error);
    });
  }

  deleteBookmark = () => {
    const bookmarksRef = db.collection('bookmarks').doc(this.props.post.id);
    bookmarksRef.delete()
    .then(() => {
      this.uiRefreshForBookmark();
      this.props.onNotification('Removed from saved posts');
      this.props.onBookmark();
    }).catch(function(error) {
      this.uiRefreshForBookmark();
      console.error("Error writing document: ", error);
    });
  }

  handleBookmark = () => {
    if(!this.state.post.bookmarked) {
      this.addBookmark();
    } else {
      this.deleteBookmark();
    }
  }

  isOwner(user, authorEmail) {
    return user && user.email === authorEmail
      ? true
      : false;
  }

  render() {
    const { classes, post, user} = this.props;
    const { anchorEl } = this.state;
    const bull = <span className={classes.bullet}>•</span>;

    const avatar = (post) => {
      if (post.category) {
        if(getCategory(post.category).image) {
          return <img alt="Avatar" src={getCategory(post.category).image} width="25"/>
        } else {
          return getCategory(post.category).name.charAt(0);
        }
      }
      return "";
    }

    const title = (post) => {
      if (!post.category) {
        return (
          <Typography variant="body2">
            <div style={{width: 300, height: 8, backgroundColor: '#f4f4f4'}}></div>
          </Typography>
        )
      }
      return  (<Typography variant="body2">c/{ post.category }
                <span style={{color: '#5d5c5c', fontSize: '12px', fontWeight: 'normal'}}>
                  {bull} Post by {this.getUsername(post.author)}
                  <Moment fromNow={true} interval={30000}>{post.timestamp}
                  </Moment>
                </span>
              </Typography>)
    }

    const body = (post) => {
      if (!post.body) {
        return (
          <span>
            <div style={{marginBottom: 8, width: 500, height: 8, backgroundColor: '#f4f4f4'}}/>
            <div style={{marginBottom: 8, width: 550, height: 8, backgroundColor: '#f4f4f4'}}/>
            <div style={{marginBottom: 8, width: 520, height: 8, backgroundColor: '#f4f4f4'}}/>
            <div style={{marginBottom: 8, width: 500, height: 8, backgroundColor: '#f4f4f4'}}/>
          </span>
        )
      }
      return (<Linkify>{ post.body }</Linkify>)
    }

    return (
      <Card className={classes.card} elevation={0}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
            <CardHeader className={classes.header}
              avatar={
                <Avatar color="secondary" aria-label="Post Avatar" className={classes.avatar}>
                  {avatar(post)}
                </Avatar>
              }
              title={title(post)}
            />
              <br />
              { post.image &&
                <Typography component="p" style={{marginBottom: 10}}>
                  { body(post) }
                </Typography>
              }
              {! post.image &&
                <Typography component="p">
                  { body(post) }
                </Typography>
              }

              {post.image &&
                <CardMedia
                  className={classes.cover}
                  image={post.image}
                  title="">
                  {post.category === 'forsale' && post.price && <Chip
                    avatar={
                      <Avatar>
                        <MoneyIcon />
                      </Avatar>
                    }
                    label={
                      post.sold? 'Sold' : post.price.toFixed(2)
                    }
                    className={classes.chip}
                    color="secondary"
                  />}
                </CardMedia>
              }
            </CardContent>
            <div className={classes.controls}>
              <Button
                onClick={() => this.handleBookmark()}
                size="small" className={classes.button}>
                <BookmarkBorder className={classes.icon}/>
                { post.bookmarked && "Unsave"  }
                { !post.bookmarked && "Save" }
              </Button>
              <Button
                onClick={() => this.props.onNotification("Not yet implemented")}
                size="small" className={classes.button}>
                <ShareIcon className={classes.icon}/>
                Share
              </Button>
              { !this.isOwner(user, post.author) &&
                <Button
                  onClick={() => this.props.onNotification("Not yet implemented")}
                  size="small" className={classes.button}>
                  <QuestionAnswer className={classes.icon}/>
                  Ask
                </Button>
              }
              { this.isOwner(user, post.author) &&
                <div>
                  <Button
                    className={classes.button}
                    aria-owns={anchorEl ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={(event) => this.setState({ anchorEl: event.currentTarget })}
                  >
                    <MoreHorizIcon className={classes.icon}/>
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => this.setState({ anchorEl: null })}
                  >
                    <MenuItem onClick={() => this.props.onDelete(post.id)}>
                      <DeleteIcon className={classes.icon}/>
                      Delete
                    </MenuItem>
                    <MenuItem onClick={() => this.markSold(post)}>
                      <SoldOutIcon className={classes.icon}/>
                      { !post.sold && "Sold"  }
                      { post.sold && "Unsold" }
                    </MenuItem>
                  </Menu>
                </div>
              }
            </div>
          </div>
      </Card>
    );
  }
}

PostCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PostCard);
