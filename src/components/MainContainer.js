import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import TopNav from './TopNav';
import PostCard from './PostCard';
import Ads from './Ads';
import About from './About';
import NotificationBar from './NotificationBar';
import { auth, db } from '../firebase/firebase';
import PostPanel from './PostPanel';
import Login from './Login';

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#dae0e6',
    padding: theme.spacing.unit * 2,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
  gutterBottom: {
    marginBottom: 10
  }
});

class MainContainer extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        posts: [],
        notificationWithUndo: false,
        notificationBarOpen: false,
        notificationBarMessage: '',
        notificationUndo: null,
        lastDeletedPostId: null,
        loginDialogOpen: false
      }
    }

    componentDidMount() {
      auth.onAuthStateChanged(user => {
          this.setState({user: user});
          if (user) {
            console.log('POINT A');
            this.getBookmarks(results => {
              this.updatePost(results);
            }, user.email);
          } else {
            console.log('POINT B');
            this.updatePost([]);
          }
      });
    }

    openLoginDialog = () => {
      this.setState({loginDialogOpen: true});
    }

    updatePost = (bookmarks) => {
      const posts = [];
      db.collection("posts")
      .where("deleted", "==", false)
      .orderBy("timestamp", "desc")
      .get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
              const post = doc.data();
              post.id = doc.id;
              post.bookmarked = false;
              if(bookmarks) {
                bookmarks.forEach(x => {
                  if(x === post.id) {
                    post.bookmarked = true;
                  }
                });
              }
              posts.push(post);
          });
          this.setState({posts: posts});
      });
    }

    getBookmarks = (callback, user) => {
      const bookmarks = [];
      db.collection("bookmarks")
      .where("user", "==", user)
      .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            bookmarks.push(doc.id);
        });
        callback(bookmarks);
      });
    }

    handleNotify = (message, undo) => {
      if (undo) {
        this.setState({notificationWithUndo: true});
      } else {
        this.setState({notificationWithUndo: false});
      }
      this.setState({ notificationBarOpen: true, notificationBarMessage: message, undo: undo })
    }

    handlePostDelete = (postId) => {
        this.setState({lastDeletedPostId: postId});
        const postRef = db.collection('posts').doc(postId);
        postRef.set({
          deleted: true,
          deletedTimestamp: Date.now()
        }, { merge: true }).then(() => {
          this.updatePost();
          this.handleNotify("Post deleted", this.handleUndeletePost);
        }).catch((error) => {
          this.handleNotify("Something when wrong. Please try again later");
        });
    }

    handleUndeletePost = () => {
        const postRef = db.collection('posts').doc(this.state.lastDeletedPostId);
        postRef.set({
          deleted: false,
          deletedTimestamp: Date.now()
        }, { merge: true }).then(() => {
          this.updatePost();
        });
        this.setState({ notificationBarOpen: false })
    }

    render () {
      const { classes } = this.props;
      const { user } = this.state;

      return(
        <div className={classes.root}>
          <TopNav user={user} onOpenLogin={() => this.openLoginDialog()} currentLocation={this.props.currentLocation} className={classes.appBar} elevation={0} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid
                container
                direction="row"
                justify="center"
                spacing={32}>
                  <Grid item sm={6} xs={12}>
                      <Grid item>
                        <PostPanel user={user} onNewPost={() => this.updatePost()} currentLocation={this.props.currentLocation} />
                      </Grid>
                      <div className={classes.gutterBottom}/>
                      {
                        this.state.posts.map(post => {
                          return (
                              <Grid key={post.id} item>
                                <PostCard user={user} post={post} onDelete={this.handlePostDelete} onNotification={this.handleNotify} />
                                <div className={classes.gutterBottom}/>
                              </Grid>
                            )
                        })
                      }
                      <Hidden smUp={true}>
                        <Grid item>
                          <About />
                        </Grid>
                      </Hidden>
                  </Grid>
                  <Hidden smDown={true}>
                    <Grid item sm={3} xs={12}>
                        <Ads />
                        <div className={classes.gutterBottom}/>
                        <About />
                    </Grid>
                  </Hidden>
              </Grid>
          </main>
          <NotificationBar
            message={ this.state.notificationBarMessage }
            open={ this.state.notificationBarOpen}
            showUndo={this.state.notificationWithUndo}
            handleUndo={(e) => this.handleUndeletePost()}
            handleClose = { e => this.setState({ notificationBarOpen: false })} />
          <Login open={this.state.loginDialogOpen} />
        </div>
      );
    }
}

MainContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainContainer);
