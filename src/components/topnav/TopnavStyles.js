export const styles = theme => ({
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    marginLeft: theme.spacing.unit,
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
});
