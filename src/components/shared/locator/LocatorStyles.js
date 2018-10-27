export const styles = theme => ({
  root: {
    display: 'flex'
  },
  flex: {
    flex: 1,
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
  locButton: {
    backgroundColor: '#fff',
    width: 252,
    border: '1px solid #fff',
    '&:hover': {
      backgroundColor: '#fff',
    },
    '&:focus': {
      backgroundColor: '#fff',
      border: '1px solid ' + theme.palette.secondary.main,
      borderBottom: '1px solid #fff',
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
    },
  },
  locButtonOpen: {
    //marginLeft: theme.spacing.unit,
    backgroundColor: '#fff',
    width: 252,
    border: '1px solid ' + theme.palette.secondary.main,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    '&:hover': {
      backgroundColor: '#fff',
      border: '1px solid ' + theme.palette.secondary.main
    }
  },
  menuGrow: {
    marginTop: -2,
    marginLeft: 1,
    border: '1px solid ' + theme.palette.secondary.main,
    borderTop: '0.01em solid #fff',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  leftIcon: {
    marginLeft: 0,
    marginRight: 10
  },
  iconSmall: {
    fontSize: 25,
  },
  iconText: {
    textTransform: 'capitalize',
  },
})
