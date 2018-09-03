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
import { auth, db } from '../firebase/firebase';
import {getCategory} from './categories';

const styles = theme => ({
  card: {
    display: 'flex',
    border: '1px solid #cdcdcd',
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

class PostCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      post: props.post.data(),
      postId: props.post.id,
      alertOpen: false,
      anchorEl: null,
      bookmarked: props.bookmarked
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
        this.setState({user: user});
    });
  }

  markSold(postId) {
    const postRef = db.collection('posts').doc(postId);
    const sold = !this.state.post.sold ? true : false

    // Update post
    const post = this.state.post;
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

  handleBookmark = () => {
    this.setState({bookmarked: true})
    const bookmarksRef = db.collection('bookmarks').doc(this.state.postId);
    bookmarksRef.set({
      user: this.state.user.email
    }, { merge: true }).then(() => {
      this.props.onNotification('Saved');
    }).catch(function(error) {
      this.setState({bookmarked: false})
      console.error("Error writing document: ", error);
    });
  }

  isOwner(email) {
    return this.state.user.email === email
      ? true
      : false;
  }

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const bull = <span className={classes.bullet}>•</span>;

    return (
      <Card className={classes.card} elevation={0}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
            <CardHeader className={classes.header}
              avatar={
                <Avatar aria-label="Recipe" className={classes.avatar}>
                    <img alt="Avatar" src={getCategory(this.state.post.category).image} width="25"/>
                </Avatar>
              }
              title={
                  <Typography variant="body2">c/{ this.state.post.category } <span style={{color: 'gray', fontSize: '12px', fontWeight: 'normal'}}> {bull} Post by {this.getUsername(this.state.post.author)} <Moment fromNow={true} interval={30000}>{this.state.post.timestamp}</Moment></span></Typography>
              }
            />

              <br />
              { this.state.post.image &&
                <Typography component="p" style={{marginBottom: 10}}>
                  <Linkify>{ this.state.post.body }</Linkify>
                </Typography>
              }
              {! this.state.post.image &&
                <Typography component="p">
                  <Linkify>{ this.state.post.body }</Linkify>
                </Typography>
              }

              {this.state.post.image &&
                <CardMedia
                  className={classes.cover}
                  image={this.state.post.image}
                  title="Live from space album cover">
                  {this.state.post.price && <Chip
                    avatar={
                      <Avatar>
                        <MoneyIcon />
                      </Avatar>
                    }
                    label={
                      this.state.post.sold? 'Sold' : this.state.post.price
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
                { this.state.bookmarked && "Unsave"  }
                { !this.state.bookmarked && "Save" }
              </Button>
              <Button
                size="small" className={classes.button}>
                <ShareIcon className={classes.icon}/>
                Share
              </Button>
              { !this.isOwner(this.state.post.author) &&
                <Button size="small" className={classes.button}>
                  <QuestionAnswer className={classes.icon}/>
                  Ask
                </Button>
              }
              { this.isOwner(this.state.post.author) &&
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
                    <MenuItem onClick={() => this.props.onDelete(this.state.postId)}>
                      <DeleteIcon className={classes.icon}/>
                      Delete
                    </MenuItem>
                    <MenuItem onClick={() => this.markSold(this.state.postId)}>
                      <SoldOutIcon className={classes.icon}/>
                      { !this.state.post.sold && "Sold"  }
                      { this.state.post.sold && "Unsold" }
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
