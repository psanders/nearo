import React, { Component } from 'react'
import Masonry from 'react-masonry-css'
import InfiniteScroll from 'react-infinite-scroller'
import { observer, inject } from 'mobx-react'

import Card from './Card'
import './Gallery.css'

@inject('postsStore')
@observer
class Gallery extends Component {

  render() {
    const { postsStore } = this.props

    const childElements = postsStore.posts.map(function(post){
       return <Card key={post.id} post={post}/>
    })

    return (
      <InfiniteScroll
        hasMore={ postsStore.keepScrolling }
        loadMore={ postsStore.showMoreResults }
        loader={<div className="loader" key={0}>Loading ...</div>}>
        <Masonry
          breakpointCols={{default: 3}}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column">
            {childElements}
        </Masonry>
      </InfiniteScroll>
    )
  }
}

export default Gallery
