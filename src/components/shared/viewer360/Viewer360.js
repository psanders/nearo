import React, { Component } from 'react'
import { Pannellum } from "pannellum-react"

class Viewer360 extends Component {
  render() {
    const { imageURL, height } = this.props

    return <Pannellum
        width="100%"
        height={height}
        image={imageURL}
        autoLoad
        autoRotate={-3}
        compass={true}
        orientationOnByDefault={true}
        onLoad={() => {
          console.log("panorama loaded")
        }}
      >
        <Pannellum.Hotspot
          type="info"
          pitch={11}
          yaw={-167}
          text="Kitchen Cabinets"
          URL="https://nearo.co"
        />
      </Pannellum>
  }
}

export default Viewer360
