import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TopNav from './TopNav';
import PostCard from './PostCard';
import Ads from './Ads';
import About from './About';
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
});

class MainContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
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
                      <br/>
                      {
                        this.state.posts.map(post => {
                          return (
                              <Grid key={post.id} item>
                                <PostCard post={post.data()} />
                                <br />
                              </Grid>
                            )
                        })
                      }
                  </Grid>
                  <Grid item sm={3}>
                      <Ads />
                      <br />
                      <About />
                  </Grid>
              </Grid>
          </main>
        </div>
      );
    }
}

MainContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainContainer);
