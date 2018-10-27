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
  avatarEdit: {
    backgroundColor: theme.palette.primary.light
  },
  details: {
    alignItems: 'center',
    maxHeight: 150,
    padding: 10
  },
  customTFRoot: {
    paddingTop: 0,
    padding: 0,
    backgroundColor: '#fff',
  },
  customTFInput: {
    padding: 5,
    color: 'black',
    fontSize: 14,
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
  closeIcon: {
    color: theme.palette.primary.light
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
