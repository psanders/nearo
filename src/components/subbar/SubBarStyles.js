export const styles = theme => ({
  filters: {
    backgroundColor: '#f4f4f4',
  },
  button: {
    minHeight: 10,
    minWidth: 10,
    padding: 7,
    textTransform: 'capitalize',
    fontSize: 13,
    border: '0',
    backgroundColor: theme.palette.accent.main,
    '&:hover': {
      backgroundColor: theme.palette.accent.light
    },
  },
  newPostBtn: {
    backgroundColor: theme.palette.accent.main,
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: theme.palette.accent.light
    },
    height: 42,
    fontSize: 16
  },
  flex: {
    flex: 1
  },
  title: {
    color: theme.palette.secondary.main
  }
})
