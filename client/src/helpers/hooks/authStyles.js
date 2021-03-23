import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  welcome: {
    marginBottom: '-20px',
    fontWeight: theme.typography.fontWeightBold,
  },
  formContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    flexWrap: 'wrap',
    minHeight: '100vh',
    paddingTop: 22,
    [theme.breakpoints.down('xs')]: {
      margin: 'auto',
    },
  },
  box: {
    padding: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    flexDirection: 'column',
    maxWidth: 900,
    margin: 'auto',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
    width: 160,
    height: 56,
    fontSize: theme.typography.h5.fontSize,
    lineHeight: theme.typography.h5.lineHeight,
    fontWeight: theme.typography.fontWeightRegular,
    borderRadius: 3,
    margin: theme.spacing(3, 2, 2),
    marginTop: 32,
    padding: 10,
  },
  inputs: {
    marginTop: '1.5rem',
  },
  forgot: {
    paddingRight: 10,
    color: theme.palette.primary.main,
  },
}));

export default useStyles;
