export const styles = theme => ({
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  leftIcon: {
    marginRight: 5
  },
  rightIcon: {
    marginLeft: 100,
  },
  iconSmall: {
    fontSize: 25,
  },
  iconText: {
    textTransform: 'capitalize',
    color: 'black'
  },
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  bootstrapInput: {
    borderRadius: 4,
    color: theme.palette.secondary.main,
    backgroundColor: '#f1f5ff',
    fontSize: 16,
    padding: '10px 12px',
    height: 22,
    width: 250,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      color: theme.palette.secondary.main,
      boxShadow: '0 0 0 0.05rem ' + theme.palette.secondary.main,
    },
    '&:hover': {
      color: theme.palette.secondary.main,
      boxShadow: '0 0 0 0.05rem ' + theme.palette.secondary.main,
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
  newPostBtn: {
    backgroundColor: theme.palette.accent.main,
    textTransform: 'capitalize',
    marginRight: 20,
    '&:hover': {
      backgroundColor: theme.palette.accent.light
    },
    height: 42,
    fontSize: 16
  },
  newPostIcon: {
    fontSize: 25,
    marginRight: 5
  },
  button: {
    textTransform: 'capitalize',
    height: 42,
    fontSize: 16
  },
});
