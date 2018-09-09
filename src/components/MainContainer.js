import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';

import Ads from './Ads';
import About from './About';
import TopNav from './topnav/TopNav';
import PostPanel from './postpanel/PostPanel';
import PostCard from './postcard/PostCard';
import NotificationBar from './NotificationBar';
import { auth, db } from './commons/firebase/firebase';
import { doSearchAlgolia } from './commons/firebase/algolia';
import { getBookmarks, saveBookmarks } from './commons/dbfunctions';

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
  },
  secAppBar: {

  }
});

class MainContainer extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        posts: [],
        nbHits: 0,
        notificationWithUndo: false,
        notificationBarOpen: false,
        notificationBarMessage: '',
        notificationUndo: null,
        lastDeletedPostId: null,
        geoloc: null,
        user: null,
        maxItemPerPage: 20
      }
    }

    componentDidMount() {
      auth.onAuthStateChanged(user => {
          this.setState({user: user});
          this.updateBookmarks(user);
          this.updateBySearch();
      });
    }

    updateBySearch = (keywords = '', offset = 0) => {
      if(keywords === 'use-old-keywords') {
        keywords = this.state.keywords;
      } else {
        this.setState({keywords: keywords});
      }

      let query = {
        query: keywords,
        offset: offset,
        length: this.state.maxItemPerPage
      };

      if (this.state.geoloc) {
        query.aroundLatLng = this.state.geoloc.lat + "," + this.state.geoloc.lng;
        query.aroundRadius = 20;
      }

      doSearchAlgolia(query, (results, nbHits) => {
        this.updatePosts(results, offset);
        this.setState({nbHits: nbHits});
      });
    }

    showMoreResults() {
      this.updateBySearch("use-old-keywords", this.state.posts.length);
    }

    updateMyGeoloc = (geoloc) => {
        this.setState({geoloc: geoloc});
        this.updateBySearch("");
    }

    updatePosts = (posts, doConcact) => {
      if (!posts) {
        return
      }

      getBookmarks().then((bookmarks) => {
        posts.forEach(post => {
          bookmarks.forEach(x => {
            if(x === post.id) {
              post.bookmarked = true;
            }
          });
      })

      if(doConcact) {
        posts = this.state.posts.concat(posts);
      }

        this.setState({posts: posts});
      })
    }

    addNewPost = (post) => {
      const posts = this.state.posts;
      posts.unshift(post);
      this.setState({posts: posts});
    }

    updateBookmarks = (user) => {
      const bookmarks = [];
      db.collection("bookmarks")
      .where("user", "==", user.email)
      .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            bookmarks.push(doc.id);
        });
        saveBookmarks(bookmarks);
      });
    }

    handleBookmark = () => {
      this.updateBookmarks(this.state.user);
    }

    handleNotify = (message, undo) => {
      if (undo) {
        this.setState({notificationWithUndo: true});
      } else {
        this.setState({notificationWithUndo: false});
      }
      this.setState({ notificationBarOpen: true, notificationBarMessage: message, undo: undo })
    }

    removePostFromArray = (postId) => {
      const posts = this.state.posts.filter(post => post.id !== postId)
      this.setState({posts: posts});
    }

    getPost = (postId) => {
      return this.state.posts.filter(post => post.id == postId)[0];
    }

    handlePostDelete = (postId) => {
        this.setState({deletedPost: this.getPost(postId)});
        const postRef = db.collection('posts').doc(postId);
        postRef.set({
          deleted: true,
          deletedTimestamp: Date.now()
        }, { merge: true }).then(() => {
          this.removePostFromArray(postId);
          this.handleNotify("Post deleted", this.handleUndeletePost);
        }).catch((error) => {
          console.log(error);
          this.handleNotify("Something when wrong. Please try again later");
        });
    }

    handleUndeletePost = () => {
        const postRef = db.collection('posts').doc(this.state.deletedPost.id);
        postRef.set({
          deleted: false,
          deletedTimestamp: Date.now()
        }, { merge: true }).then(() => {
          const posts = this.state.posts;
          const deletedPost = this.state.deletedPost;
          deletedPost.deleted = false;
          posts.push(deletedPost);
          this.setState({posts: posts});
        });
        this.setState({ notificationBarOpen: false })
    }

    render () {
      const { classes } = this.props;
      const { user } = this.state;

      return(
        <div className={classes.root}>
          <TopNav
            onChangeLocation={geoloc => this.updateMyGeoloc(geoloc)}
            onSearch={searchText => this.updateBySearch(searchText)}
            user={user}
            defaultLocation={this.props.currentLocation}
            className={classes.appBar} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid
                container
                direction="row"
                justify="center"
                spacing={32}>
                  <Grid item sm={6} xs={12}>
                      <Grid item>
                        <PostPanel user={user} onNewPost={(post) => this.addNewPost(post)} onNotification={this.handleNotify} currentLocation={this.props.currentLocation} />
                      </Grid>
                      <div className={classes.gutterBottom}/>

                        {
                          this.state.posts.map(post => {
                            return (
                               <Grid key={post.id} item>
                                 <PostCard user={user} post={post} onBookmark={this.handleBookmark} onDelete={this.handlePostDelete} onNotification={this.handleNotify} />
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
                      {
                        this.state.posts.length < this.state.nbHits &&
                        <Grid item>
                          <Button onClick={() => this.showMoreResults()}>Show more</Button>
                        </Grid>
                      }
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
        </div>
      );
    }
}

MainContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainContainer);
