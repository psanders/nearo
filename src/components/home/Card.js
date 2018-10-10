import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Moment from 'react-moment'
import ButtonBase from '@material-ui/core/ButtonBase'
import Linkify from 'react-linkify'
import firebase from 'firebase/app'
import { Link } from 'react-router-dom'

import PostActions from '../postcard/PostActions'
import { imageURL } from '../commons/utils'

const styles = theme => ({
  cardImg: {
    width: 290,
  },
  card: {
    width: 290,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: { /* Leave this here for later */
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main
  },
})

class RecipeReviewCard extends React.Component {
  state = { expanded: false }

  handleExpandClick = () => this.setState(state => ({ expanded: !state.expanded }))

  render() {
    const { classes, post } = this.props

    return (
      <Card className={classes.card} elevation={0} style={{marginBottom: 30}}>
        <CardHeader
          avatar={
            <Avatar src={post.avatar} aria-label="Recipe" className={classes.avatar} />
          }

          subheader={ <Moment fromNow={true} interval={30000}>{new firebase.firestore.Timestamp(post.timestamp._seconds, post.timestamp._nanoseconds).toDate()}</Moment>}
        />
        {
          post.media &&
          post.media.length > 0 &&
          <Link to={'/posts/' + post.id} >
            <ButtonBase aria-label="Open Publication Details">
              <img alt="" className={classes.cardImg} src={ imageURL(post, 'md') } />
            </ButtonBase>
          </Link>
          }
        <CardContent>
          <Typography component="p">
            <Linkify>
              { post.body }
            </Linkify>
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <PostActions post={post} home={true}/>
          {/*<IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>*/}
        </CardActions>
        {/*<Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
              minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
              heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
              browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
              chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
              salt and pepper, and cook, stirring often until thickened and fragrant, about 10
              minutes. Add saffron broth and remaining 4 1/2 cups chicken broth bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
              without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat
              to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and
              cook again without stirring, until mussels have opened and rice is just tender, 5 to 7
              minutes more. (Discard any mussels that don’t open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then serve.
            </Typography>
          </CardContent>
        </Collapse> */}
      </Card>
    )
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(RecipeReviewCard)
