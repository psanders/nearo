import { observable, when } from "mobx"
import { usersStore } from './users'
import { bookmarksStore } from './bookmarks'
import { appStore } from './app'
import { doSearchAlgolia } from '../commons/firebase/algolia'

const maxItemperPage = 20

class PostsStore {

    @observable posts = []
    @observable nbHits = 0

    constructor () {
      when(
        () => appStore.isReady(),
        () => {
          console.log("User status is", usersStore.isStatusVerified())
          this.updateBySearch({searchTerm: ''})
        })
    }

    updateBySearch = (navInfo, offset = 0) => {
      let query = {
        query: navInfo.searchTerm,
        offset: offset,
        length: maxItemperPage
      }

      if (navInfo.locInfo && navInfo.locInfo.latLng) {
        query.aroundLatLng = navInfo.locInfo.latLng.lat + ","
          + navInfo.locInfo.latLng.lng
        query.minimumAroundRadius = 20000
      }

      doSearchAlgolia(query, (results, nbHits) => {
        this.updatePosts(results, offset)
        this.nbHits = nbHits
      })
    }

    updatePosts = (posts, doConcact) => {
      if (!posts) return

      const bookmarks = usersStore.isSignedIn()
        ? bookmarksStore.bookmarks
        : []

      posts.forEach(post => {
        bookmarks.forEach(x => {
          if(x === post.id) {
            post.bookmarked = true
          }
        })
      })
      if(doConcact) {
        posts = this.posts.concat(posts)
      }
      this.posts = posts
    }


    showMoreResults = () => this.updateBySearch(this.state.navInfo, this.state.posts.length)

    addNewPost = post => {
      const posts = this.state.posts
      posts.unshift(post)
      this.setState({posts: posts})
    }

    removePostFromArray = postId => {
      const posts = this.state.posts.filter(post => post.id !== postId)
      // I do this to prevent the "show more button" from showing up
      this.setState({nbHits: (this.state.nbHits - 1)})
      this.setState({posts: posts})
    }

    getPost = postId => this.state.posts.filter(post => post.id === postId)[0]

    /*handlePostDelete = (post) => {
      this.setState({deletedPost: this.getPost(post.id)})
      const postRef = db.collection('posts').doc(post.id)
      postRef.set({
        deleted: true,
        deletedTimestamp: Date.now()
      }, { merge: true }).then(() => {
        this.removePostFromArray(post.id)
        this.handleNotify("Post deleted", this.handleUndeletePost)
      }).catch((error) => {
        console.log(error)
        this.handleNotify("Something when wrong. Please try again later")
      })
    }*/

    /*handleUndeletePost = () => {
      const postRef = db.collection('posts').doc(this.state.deletedPost.id)
      postRef.set({
        deleted: false,
        deletedTimestamp: Date.now()
      }, { merge: true }).then(() => {
        const posts = this.state.posts
        const deletedPost = this.state.deletedPost
        deletedPost.deleted = false
        posts.push(deletedPost)
        this.setState({posts: posts})
      })
      this.setState({ notificationBarOpen: false })
    }*/

    /*markSold = (post) => {
      const postRef = db.collection('posts').doc(post.id)
      const sold = !post.sold ? true : false

      // Update post
      post.sold = sold
      this.setState({post: post})

      postRef.set({
         sold: !sold
      }, { merge: true }).then(() => {
        if(sold) {
          this.handleNotify('Post marked as sold')
        } else {
          this.handleNotify('Post marked as unsold')
        }
      }).catch(error => {
        post.sold = !sold
        this.setState({post: post})
        console.error("Error writing document: ", error)
      })
    }*/

}

export const postsStore = new PostsStore()
