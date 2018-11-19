import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import PlayIcon from '@material-ui/icons/KeyboardArrowRight'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { observer, inject } from 'mobx-react'
import { computed } from 'mobx'

import StaffPick from 'components/mobile/staffpick/StaffPick'
import WelcomeBanner from 'components/mobile/welcomebanner/WelcomeBanner'

@inject('routing')
@inject('appStore')
@inject('bookmarksStore')
@observer
class HomePage extends Component {
  state = {
    value: this.currentView,
  }

  @computed get currentView() {
    return this.props.routing.location.pathname
  }

  render () {
    const style = {
      anchor: {
        textDecoration: 'none',
        color: 'gray'
      }
    }

    return <div>
      <Paper square elevation={0}>
        <Tabs
          value={this.state.value}
          indicatorColor="primary"
          textColor="primary"
          fullWidth
        >
          <Tab style={{textTransform: 'capitalize'}} label="Home" value="/"/>
          <Tab style={{textTransform: 'capitalize'}} label="Explore" value="/explore" onClick={() => this.props.routing.push('/explore')} />
          <Tab style={{textTransform: 'capitalize'}} label="About" value="/about" onClick={() => this.props.routing.push('/about')} />
        </Tabs>
      </Paper>
      { !this.props.appStore.isIntroBannerClosed() && <WelcomeBanner /> }
      <Divider style={{marginTop: 10}}/>
      <Paper square elevation={0}>
          <div style={{
            padding: 10,
            paddingTop: 10,
            paddingBottom: 10}}>
          <Typography variant="body1" gutterBottom>
            Staff Pick
          </Typography>
          <Typography variant="caption" gutterBottom style={{marginBottom: 10}}>
            See what you can do with a post on Nearo. This items are top picks by our staff.
          </Typography>
          <StaffPick />
          </div>
          <Divider style={{marginTop: 10, height: '0.05em'}}/>
          <Button onClick={() => this.props.routing.push('/explore')} style={{textTransform: 'capitalize', width: '100%'}} variant="text">
            <Typography color="primary" variant="body1">
            Begin Exploring Nearo
            </Typography>
            <PlayIcon color="secondary" style={{marginLeft: 20}} />
          </Button>
      </Paper>

      <Divider style={{marginTop: 10}}/>
      <Paper square elevation={0} style={{
        padding: 10}}>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Hot Topics
        </Typography>
        <div style={{display: 'inline-block', width: '100%'}}>
          <List style={{float: 'left', width: '30%'}} dense={true}>
            <ListItem><a  color="primary" style={style.anchor} href="/explore?q=cars"><ListItemText color="primary" primary="Cars" /></a></ListItem>
            <ListItem><a style={style.anchor} href="/explore?q=housing"><ListItemText primary="Housing" /></a></ListItem>
            <ListItem><a style={style.anchor} href="/explore?q=service"><ListItemText primary="Service" /></a></ListItem>
          </List>
          <List style={{float: 'left', width: '30%'}} dense={true}>
            <ListItem><a style={style.anchor} href="/explore?q=forsale"><ListItemText primary="For Sale" /></a></ListItem>
            <ListItem><a style={style.anchor} href="/explore?q=community"><ListItemText primary="Community" /></a></ListItem>
            <ListItem><a style={style.anchor} href="/explore?q=jobs"><ListItemText primary="Jobs" /></a></ListItem>
          </List>
          <List style={{float: 'left', width: '30%'}} dense={true}>
            <ListItem><a style={style.anchor} href="/explore?q=news"><ListItemText primary="News" /></a></ListItem>
            <ListItem><a style={style.anchor} href="/explore?q=investments"><ListItemText primary="Investments" /></a></ListItem>
            <ListItem><a style={style.anchor} href="/explore?q=events"><ListItemText primary="Events" /></a></ListItem>
          </List>
        </div>
      </Paper>

      <div elevation={0} style={{width: '100%', textAlign: 'center', marginTop: 10, marginBottom: 10}}>
        <Typography variant="body1" color="textSecondary">
          Nearo © 2018 <a style={style.anchor} href="/about">Privacy & Terms</a>
        </Typography>
      </div>
    </div>
  }
}

export default HomePage
