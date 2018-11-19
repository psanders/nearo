import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { observer, inject } from 'mobx-react'
import { computed } from 'mobx'

@inject('routing')
@inject('usersStore')
@inject('postsStore')
@inject('notificationsStore')
@observer
class SubNav extends Component {
  state = {
    value: this.currentView,
  }

  @computed get currentView() {
    return this.props.routing.location.pathname
  }

  @computed get signedIn() {
    return this.props.usersStore.signedIn
  }

  navigate = (event, value) => {
    if (!this.signedIn && (value === '/favorites' || value === '/createpost')) {
      this.props.notificationsStore.showMustLogin(()=> {
        this.props.routing.push('/login')
      })
      return
    }

    if (value === '/createpost') {
      this.props.postsStore.openPostDialog()
      return
    }

    this.setState({value: value})

    if(value === '/profile' && !this.signedIn) {
      this.props.routing.push('/login')
      return
    }

    this.props.routing.push(value)
  }

  render = props => <Paper square elevation={0}>
    <Tabs
       value={this.state.value}
       onChange={this.navigate}
       indicatorColor="primary"
       textColor="primary"
       fullWidth
     >
       <Tab style={{textTransform: 'capitalize'}} label="Home" value="/" />
       <Tab style={{textTransform: 'capitalize'}} label="Explore" value="/explore" />
       <Tab style={{textTransform: 'capitalize'}} label="About" value="/about" />
     </Tabs>
     <Divider />
   </Paper>
}

export default SubNav
