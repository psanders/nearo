import React, { Component } from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import "./overwrite.css"

import {
  imageURL,
  postMedia,
  hasPanorama,
  hasMedia,
} from 'components/commons/utils'
import Viewer360 from 'components/shared/viewer360/Viewer360'

const photo = {
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  display: 'flex',
}

class MediaCard extends Component {

  render = () => {
    const { post } = this.props
    return <div>
      { hasMedia(post)  &&
        !hasPanorama(post) &&
        <Carousel showThumbs={ false }
          showIndicators={ post.media.length > 1 }
          showStatus={ post.media.length > 1 }>
          {
            postMedia(post).map(post => {
              const blur = {
                width: '100%',
                height:'100%',
                backgroundImage: "url('" + post.original + "')",
                position: 'absolute',
                backgroundSize: 'cover',
                filter: 'blur(5px)',
              }
              return <div key={ post.original } style={ photo }>
                <div style={ blur }></div>
                <img alt={ post.title } style={{zIndex: 1000, width: '100%', alignSelf: 'center'}} src={post.original} />
              </div>
            })
          }
        </Carousel>
      }
      {
        hasMedia(post) &&
        hasPanorama(post) && <Viewer360 width="250px" imageURL={imageURL(post, 'panorama')} />
      }
    </div>
  }
}

export default MediaCard
