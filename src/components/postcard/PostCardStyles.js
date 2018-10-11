export const styles = theme => ({
  post: {
    flexGrow: 1,
    backgroundColor: '#fff'
  },
  postDesktop: {
    '&:hover': {
      backgroundColor: theme.palette.primary.a50,
    }
  },
  postMobile: {
  },
  image: {
    width: '100%',
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  cover: {
    minHeight: 50,
    borderRadius: 2,
    width: 130,
    height: 110,
    margin: theme.spacing.unit
  },
  actionsContainer: {
    padding: theme.spacing.unit
  },
  actionBtn: {
    textTransform: 'Capitalize',
    fontSize: 8,
    color: '#5d5c5c',
    padding: 5,
    minHeight: 2,
    minWidth: 2,
    marginRight: 5
  },
  actionIcon: {
    color: '#5d5c5c',
    fontSize: 16,
    marginRight: 5
  },
  favLiked: {
    color: '#ff5959',
  },
  shareIcon: {
    /*transform: 'rotate(45deg)'*/
  },
  logoIcon: {
    width: '18px',
    marginRight: 5
  },
  row: {
    display: 'flex'
  },
  button: {
    minHeight: 10,
    minWidth: 10,
    padding: 2,
    marginRight: 10,
    textTransform: 'capitalize',
    fontSize: 14,
    fontWeight: 200,
    color: '#2398c9'
  },
  panoramaIcon: {
    borderRadius: 25,
    borderColor: '#fff',
    padding: 3,
    backgroundColor: 'rgba(0,0,0,.4)',
    color: '#fff',
    height: 20,
    width: 20,
    position: 'absolute',
    right: 15,
    bottom: 15,
  },
  panoramaIconBig: {
    height: 12,
    width: 12,
    padding: 5,
    right: 5,
    bottom: 5,
    backgroundPosition: '5px -1px'
  },
  placeHolder: {
    backgroundColor: '#f4f4f4',
    border: '1px solid #757ce8',
    width: 130,
    height: 110,
    borderRadius: 3,
    margin: theme.spacing.unit
  }
})
