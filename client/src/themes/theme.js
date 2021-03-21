import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    fontFamily: "'Open Sans', sans-serif;",
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '19px',
    button: {
      fontWeight: 400,
      lineHeight: '19px',
      textTransform: 'none',
      height: 54,
    },
    body1: {
      fontWeight: 400,
      lineHeight: '19px',
    },
    h5: {
      fontSize: 26,
      fontWeight: 600,
      lineHeight: '40px',
    },
  },
  palette: {
    primary: { main: '#3A8DFF' },
  },
});

export default theme;
