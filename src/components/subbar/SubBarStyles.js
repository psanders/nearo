export const styles = theme => ({
  filters: {
    backgroundColor: '#f4f4f4',
  },
  button: {
    textTransform: 'capitalize',
    border: '0',
    backgroundColor: theme.palette.accent.main,
    '&:hover': {
      backgroundColor: theme.palette.accent.light
    },
  },
  flex: {
    flex: 1
  },
  title: {
    color: theme.palette.secondary.main
  }
})
