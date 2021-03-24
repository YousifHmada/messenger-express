import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  welcome: {
    marginBottom: '-1.429rem', // -20px
    fontWeight: theme.typography.fontWeightBold,
  },
  formContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    flexWrap: 'wrap',
    minHeight: '100vh',
    paddingTop: '1.572rem', // 22px
    [theme.breakpoints.down('xs')]: {
      margin: 'auto',
    },
  },
  box: {
    padding: '1.714rem', // 24px
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    flexDirection: 'column',
    maxWidth: '900px',
    margin: 'auto',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
    width: '11.429rem', // 160px
    height: '3.572rem', // 56px
    fontSize: theme.typography.h5.fontSize,
    lineHeight: theme.typography.h5.lineHeight,
    fontWeight: theme.typography.fontWeightRegular,
    borderRadius: '3px',
    margin: theme.spacing(3, 2, 2),
    marginTop: '2.286rem', // 32px
    padding: '0.715', // 10px
  },
  inputs: {
    marginTop: '1.5rem',
  },
  forgot: {
    paddingRight: '0.715rem', // 10px
    color: theme.palette.primary.main,
  },
}));
