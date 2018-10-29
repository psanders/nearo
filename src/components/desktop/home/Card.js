import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'
import Linkify from 'react-linkify'
import { observer, inject } from 'mobx-react'
import green from '@material-ui/core/colors/green'

import PostActions from 'components/shared/postactions/PostActions'
import { imageURL } from 'components/commons/utils'
import { commonStyles } from 'shared/styles/styles'

@inject('routing')
@inject('postsStore')
@observer
class RecipeReviewCard extends React.Component {
  state = { expanded: false }

  handleExpandClick = () => this.setState(state => ({ expanded: !state.expanded }))

  handleClick = post => {
    this.props.postsStore.currentPost = post
    this.props.routing.push('/posts/' + post.id)
  }

  render() {
    const { classes, post } = this.props

    return (
      <Card className={classes.card} elevation={0}>
        <CardHeader
          avatar={
            <Avatar alt={post.title} src={post.avatar} aria-label="Recipe" className={classes.avatar} />
          }
          subheader={ post.author }
        />
        {
          post.media &&
          post.media.length > 0 &&
          <ButtonBase aria-label="Open Publication Details" onClick={() => this.handleClick(post)}>
            <img alt="" className={classes.cardImg} src={ imageURL(post, 'md') } />
          </ButtonBase>
        }
        <CardContent className={classes.cardContent} onClick={() => this.handleClick(post)}>
          <Typography variant="body1">
            <Linkify>{ post.body }</Linkify>
          </Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          <PostActions post={post} home={true}/>
          <span style={commonStyles.flex} />
          {
            post.category === 'forsale' &&
            (post.price > 0 || post.sold) &&
            <Typography variant="body1" className={classes.greenText}>${post.price}</Typography>
          }

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


const styles = theme => ({
  cardContent: {
    padding: theme.spacing.unit,
    cursor: 'pointer',
    '&:hover': {
      background: '#f4f4f4'
    }
  },
  cardImg: {
    width: 280,
  },
  card: {
    maxWidth: 280,
    marginBottom: theme.spacing.unit * 2,
    borderRadius: 0
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
    padding: theme.spacing.unit,
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
  greenText: {
    color: green[500]
  }
})

export default withStyles(styles)(RecipeReviewCard)
