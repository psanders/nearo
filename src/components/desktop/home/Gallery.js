import React, { Component } from 'react'
import Masonry from 'react-masonry-css'
import InfiniteScroll from 'react-infinite-scroller'
import { observer, inject } from 'mobx-react'
import { computed } from 'mobx'

import Categories from './Categories'
import Card from './Card'
import './Gallery.css'

@inject('postsStore')
@observer
class Gallery extends Component {
  @computed get posts() {
    return this.props.postsStore.posts
  }

  render() {
    const { postsStore } = this.props

    const childElements = this.posts.map(function(post){
      return <Card key={post.id} post={post}/>
    })

    childElements.unshift(<Categories key="categories"/>)

    return (
      <InfiniteScroll
        hasMore={ postsStore.keepScrolling }
        loadMore={ postsStore.showMoreResults }
        loader={<div className="loader" key={0}>Loading ...</div>}>
        <Masonry
          breakpointCols={{default: 4, 960: 3, 600: 3}}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column">
            { childElements }
        </Masonry>
      </InfiniteScroll>
    )
  }
}

export default Gallery
