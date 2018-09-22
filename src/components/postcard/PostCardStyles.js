export const styles = theme => ({
  post: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
    borderBottom: '1px solid #f4f4f4',
    '&:hover': {
      backgroundColor: theme.palette.primary.a50,
    }
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
  shareIcon: {
    transform: 'rotate(45deg)'
  },
  liked: {
    color: '#ff5959',
    fontSize: 14,
    marginRight: 5
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
});
