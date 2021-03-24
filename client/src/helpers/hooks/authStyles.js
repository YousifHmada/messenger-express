import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  welcome: {
    marginBottom: '-1.429rem', // -20px
    fontWeight: theme.typography.fontWeightBold,
  },
  formContainer: {
    minHeight: '100vh',
    paddingTop: '1.572rem', // 22px
    [theme.breakpoints.down('xs')]: {
      margin: 'auto',
    },
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    paddingBottom: '6.786rem', // 95px
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
