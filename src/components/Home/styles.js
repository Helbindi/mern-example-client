import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '1em',
  },
  buttonSubmit: {
    marginBottom: '0.5em',
  },
  pagination: {
    borderRadius: 5,
    margin: '1.5em auto',
    padding: '1em',
    maxWidth: '500px',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
}));