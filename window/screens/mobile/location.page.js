import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Location from '../../components/mobile/location/Location'

const style = {
  height: 'calc(100vh - 110px)'
}

@inject('postsStore')
@observer
class LocationPage extends Component {
  render = () => <div style={ style }><Location /></div>
}

export default LocationPage
