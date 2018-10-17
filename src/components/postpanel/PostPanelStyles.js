export const styles = theme => ({
  flex: {
    flex: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  details: {
    alignItems: 'center',
    padding: 0,
    maxHeight: 150,
    width: 400
  },
  customTFRoot: {
    paddingTop: 10,
    backgroundColor: '#fff',
    height: '100vh',
  },
  customTFInput: {
    padding: 10,
    color: 'black',
    fontSize: 14,
    height: '100vh',
  },
  newPostBtn: {
    textTransform: 'capitalize',
    backgroundColor: theme.palette.accent.main,
    '&:hover': {
      backgroundColor: theme.palette.accent.light,
    }
  },
  button: {
    textTransform: 'capitalize'
  },
  addIcon: {
    color: theme.palette.accent.main
  },
  chip: {
    margin: theme.spacing.unit,
  },
  counter: {
    position: 'absolute',
    top: 0,
    right: 0,
    marginTop: 67,
    marginRight: 5
  }
})
