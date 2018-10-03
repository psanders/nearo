import React, { Component } from 'react'
import { Pannellum } from "pannellum-react";

class Viewer360 extends Component {
  render() {
    const { imageURL, height } = this.props

    return <Pannellum
          width="100%"
          height={height}
          image={imageURL}
          autoLoad
          autoRotate={true}
          compass={true}
          orientationOnByDefault={true}
          onLoad={() => {
            console.log("panorama loaded");
          }}
      >
        <Pannellum.Hotspot
          type="info"
          pitch={11}
          yaw={-167}
          text="Info Hotspot Text 3"
          URL="https://github.com/farminf"
        />

        <Pannellum.Hotspot
          type="info"
          pitch={31}
          yaw={-107}
          text="Info Hotspot Text 4"
          URL="https://github.com/farminf"
        />
      </Pannellum>
  }
}

export default Viewer360
