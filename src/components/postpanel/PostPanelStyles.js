export const styles = theme => ({
  flex: {
    flex: 1,
  },
  root: {
    width: '100%',
    border: '1px solid #cdcdcd',
  },
  cover: {
    minHeight: 300,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
    padding: 0
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  customTFRoot: {
    backgroundColor: '#fff',
    width: 'calc(100% - 20px)',
    padding: 10,
  },
  customTFInput: {
    color: 'black',
    fontSize: 14
  },
  customTFLabel: {
  },
  button: {
    textTransform: 'Capitalize',
  },
})
