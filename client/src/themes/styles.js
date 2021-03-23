import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
    '& .MuiFormControl-marginNormal': {
      marginTop: '32px',
    },
    '& .MuiFormLabel-root': {
      ...theme.typography.body1,
      color: 'rgb(0,0,0,0.4)',
      paddingLeft: '5px',
    },
    '& .MuiInputBase-input': {
      ...theme.typography.body1,
      fontWeight: theme.typography.fontWeightBold,
      height: '1rem',
      padding: '5px',
      paddingBottom: '8px',
      verticalAlign: 'middle',
    },
    '& .MuiInputBase-input[type=password]': {
      fontSize: '2rem',
    },
  },
}));

export default useStyles;
