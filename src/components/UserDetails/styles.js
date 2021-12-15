import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '400px',
  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '1em',
    paddingTop: '1em',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      paddingTop: 0,
    },
  },
  userPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  userCards: {
    padding: '1em',
    margin: '1em',
    cursor: 'pointer',
    border: '2px solid black',
  },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '15px',
    height: '39vh',
  },
  container: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '10px 50px',
  },
  buttonSubmit: {
    marginBottom: '0.5em',
  },
}));
