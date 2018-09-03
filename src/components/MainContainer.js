import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TopNav from './TopNav';
import PostCard from './PostCard';
import Ads from './Ads';
import About from './About';
import NotificationBar from './NotificationBar';
import { db } from '../firebase/firebase';
import PostPanel from './PostPanel';

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
        }
    }

    componentDidMount() {
      this.reloadPosts();
    }

    reloadPosts() {
      const posts = [];
      db.collection("posts")
      .orderBy("timestamp", "desc")
      .get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              posts.push(doc);
          });
          this.setState({posts: posts});
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
          this.reloadPosts();
          this.handleNotify("Post deleted", this.handleUndeletePost);
        }).catch(function(error) {
          this.handleNotify("Something when wrong. Please try again later");
        });
    }

    handleUndeletePost = () => {
        const postRef = db.collection('posts').doc(this.state.lastDeletedPostId);
        postRef.set({
           deleted: false,
           deletedTimestamp: Date.now()
        }, { merge: true }).then(() => {
          this.reloadPosts();
        });
        this.setState({ notificationBarOpen: false })
    }

    render () {
      const { classes, user } = this.props;

      return(
        <div className={classes.root}>
          <TopNav currentLocation={this.props.currentLocation} elevation={0}  className={classes.appBar} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid
                container
                direction="row"
                justify="center"
                spacing={32}>
                  <Grid item sm={6}>
                      <Grid item>
                        <PostPanel user={user} onNewPost={() => this.reloadPosts()} currentLocation={this.props.currentLocation} />
                      </Grid>
                      <div className={classes.gutterBottom}/>
                      {
                        this.state.posts.map(post => {
                          return (
                              <Grid key={post.id} item>
                                <PostCard onDelete={this.handlePostDelete} onNotification={this.handleNotify} post={post} />
                                <div className={classes.gutterBottom}/>
                              </Grid>
                            )
                        })
                      }
                  </Grid>
                  <Grid item sm={3}>
                      <Ads gutterBottom />
                      <div className={classes.gutterBottom}/>
                      <About />
                  </Grid>
              </Grid>
          </main>
          <NotificationBar
              message={ this.state.notificationBarMessage }
              open={ this.state.notificationBarOpen}
              showUndo={this.state.notificationWithUndo}
              handleUndo={(e) => this.handleUndeletePost()}
              handleClose = { e => this.setState({ notificationBarOpen: false })} />
        </div>
      );
    }
}

MainContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainContainer);
