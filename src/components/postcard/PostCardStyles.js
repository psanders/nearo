export const styles = theme => ({
  card: {
    display: 'flex',
    border: '1px solid #cdcdcd',
    minHeight: 170,
    '&:hover': {
        border: '1px solid #444',
        cursor: 'pointer'
    }
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    minHeight: 300,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit + 5,
    paddingBottom: 8
  },
  button: {
    textTransform: 'Capitalize',
    fontSize: 12,
    color: '#5d5c5c',
    marginRight: 2
  },
  icon: {
    color: '#5d5c5c',
    marginRight: 8,
    fontSize: 20
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  avatar: {
    width: 25,
    height: 25,
    backgroundColor: '#3a3aa2',
  },
  header: {
    padding: 0
  },
  chip: {
    margin: theme.spacing.unit,
  },
});
