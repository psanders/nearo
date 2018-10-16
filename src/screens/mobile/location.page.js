import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import Location from '../../components/moblocation/Location'

@inject('postsStore')
@observer
class LocationPage extends Component {
  render () {
    return <Fragment>
      <Location />
    </Fragment>
  }
}

export default LocationPage
