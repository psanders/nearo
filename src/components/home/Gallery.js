import React, { Component } from 'react'
import Hidden from '@material-ui/core/Hidden'
import Masonry from 'react-masonry-css'

import { db } from '../commons/firebase/firebase'
import Card from './Card'
import './Gallery.css'

class Gallery extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    // Add limit
    // Hide deleted
    // Order by age
    db.collection("posts")
    .get()
    .then(querySnapshot => {
      const posts = []
      querySnapshot.forEach(doc => {
        const post = doc.data()
        post.id = doc.id
        posts.push(post)
      })
      this.setState({posts: posts})
      console.log(posts)
    })
  }

  render() {
    const childElements = this.state.posts.map(function(post){
       return (
          <Card key={post.id} post={post}/>
        )
    })

    const masonry = cols => <Masonry
      breakpointCols={cols}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column">
        {childElements}
    </Masonry>

    return (
      <div>
        <Hidden smDown={true}>{masonry(3)}</Hidden>
        <Hidden mdUp={true}>{masonry(2)}</Hidden>
      </div>
    )
  }
}

export default Gallery
