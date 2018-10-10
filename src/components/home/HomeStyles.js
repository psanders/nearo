export const styles = theme => ({
  chip: {
    marginRight: theme.spacing.unit * 2
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
    textDecoration: 'none',
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
    borderRadius: 0,
    color: theme.palette.secondary.main,
    backgroundColor: '#fff',
    fontSize: 16,
    marginTop: 5,
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
    ].join(',')
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
    marginLeft: 15,
  },
  searchBtn: {
    width: 100,
    textTransform: 'capitalize',
    marginLeft: theme.spacing.unit,
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.light
    },
  },
})
