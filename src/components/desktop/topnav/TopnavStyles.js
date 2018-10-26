export const styles = theme => ({
  searchInput2: {
    backgroundColor: '#fff',
    borderRadius: 4,
    width: 240,
  },
  progress: {
    color: theme.palette.accent.main,
  },
  avatar: {
    width: 30,
    height: 30,
  },
  left: {
    marginLeft: theme.spacing.unit
  },
  right: {
    marginRight: theme.spacing.unit
  },
  logo: {
    color: '#fff',
    cursor: 'pointer',
    marginRight: theme.spacing.unit
  },
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
    backgroundColor: '#fff',
    fontSize: 16,
    padding: '10px 12px',
    height: 20,
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
      //boxShadow: '0 0 0 0.05rem ' + theme.palette.secondary.main,
    },
    '&:hover': {
      color: theme.palette.secondary.main,
      //boxShadow: '0 0 0 0.05rem ' + theme.palette.secondary.main,
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
  signupBtn: {
    textTransform: 'capitalize',
    marginLeft: theme.spacing.unit,
    color: '#000',
    backgroundColor: theme.palette.accent.main,
    borderColor: theme.palette.accent.main,
    '&:hover': {
      backgroundColor: theme.palette.accent.light
    },
  },
  loginBtn: {
    textTransform: 'capitalize',
    marginLeft: theme.spacing.unit,
    color: '#fff',
    border: '1px solid #fff'
  },
  locationIcon: {
    color: '#fff',
  },
  fingerPrint: {
    //color: theme.palette.accent.light
    color: '#fff'
  },
})
