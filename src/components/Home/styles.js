import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  buttonSubmit: {
    marginBottom: '0.5em',
  },
  pagination: {
    borderRadius: 4,
    margin: '1rem auto',
    padding: '16px',
    maxWidth: '500px',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
}));