import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
    '& .MuiFormControl-marginNormal': {
      marginTop: '2.286rem', // 32px
    },
    '& .MuiFormLabel-root': {
      ...theme.typography.body1,
      color: 'rgb(0,0,0,0.4)',
      paddingLeft: '0.358rem', // 5px
    },
    '& .MuiInputBase-input': {
      ...theme.typography.body1,
      fontWeight: theme.typography.fontWeightBold,
      height: '1rem',
      padding: '0.358rem', // 5px
      paddingBottom: '0.572rem', // 8px
      verticalAlign: 'middle',
    },
    '& .MuiInputBase-input[type=password]': {
      fontSize: '2rem',
    },
  },
}));
