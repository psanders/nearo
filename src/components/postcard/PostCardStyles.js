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
    width: 128,
    height: 128,
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
    fontSize: 14,
    marginRight: 5
  },
});
