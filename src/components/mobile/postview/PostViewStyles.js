import green from '@material-ui/core/colors/green'

export const styles = theme => ({
  price: {
    marginLeft: 3,
    fontSize: 12,
    color: green[400],
    border: '1px solid gray',
    borderRadius: 2,
    paddingLeft: 3,
    paddingRight: 3
  },
  root: {
    backgroundColor: '#fff'
  },
  post: {
    minHeight: 400,
  },
  postContainer: {
    padding: theme.spacing.unit,
    paddingBottom: 0
  },
  postActions: {
    paddingTop: 0,
    padding: theme.spacing.unit,
  },
  photo: {
    width: '100%',
  },
  capitalize: {
    textTransform: 'capitalize'
  },
  top20: {
    marginTop: 20
  },
  bottom10: {
    marginBottom: 10
  },
  chip: {
    margin: theme.spacing.unit,
    color: '#fff'
  },
  moneyIcon: {
    color: '#fff'
  },
})
