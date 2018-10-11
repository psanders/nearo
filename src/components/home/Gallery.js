import React, { Component } from 'react'
import Masonry from 'react-masonry-css'
import InfiniteScroll from 'react-infinite-scroller'
import { observer, inject } from 'mobx-react'
import { computed } from 'mobx'

import Card from './Card'
import './Gallery.css'

@inject('postsStore')
@observer
class Gallery extends Component {
  @computed get keepScrolling() {
    const pStore = this.props.postsStore
    return !pStore.loadingPosts && pStore.posts.length !== pStore.nbHits
      ? true
      : false
  }

  @computed get posts() {
    return this.props.postsStore.posts
  }

  handleScroll = (scrollArea) => this.props.postsStore.showMoreResults()

  render() {
    const childElements = this.posts.map(function(post){
       return <Card key={post.id} post={post}/>
    })

    return (
      <InfiniteScroll
        hasMore={this.keepScrolling}
        loadMore={this.handleScroll}
        loader={<div className="loader" key={0}>Loading ...</div>}>
        <Masonry
          breakpointCols={3}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column">
            {childElements}
        </Masonry>
      </InfiniteScroll>
    )
  }
}

export default Gallery
