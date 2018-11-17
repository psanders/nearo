import { fade } from '@material-ui/core/styles/colorManipulator';

export const styles = theme => ({
  search: {
    position: 'relative',
    borderRadius: 25,
    backgroundColor: theme.palette.primary.dark,
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 1),
    },
    marginLeft: 0,
    marginRight: 0,
    width: '100%',
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.primary.light,
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    borderRadius: 25,
    paddingLeft: theme.spacing.unit * 8,
    transition: theme.transitions.create('width'),
    color: theme.palette.primary.light,
    borderBottom: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
})
