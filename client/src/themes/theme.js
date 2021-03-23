import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    fontFamily: "'Open Sans', sans-serif;",
    lineHeight: '19px',
    fontWeightLight: 400,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 600,
    h3: {
      fontSize: '1.857rem', // 26px
      lineHeight: '40px',
    },
    h4: {
      fontSize: '1.428rem', // 20px
      lineHeight: '27px',
    },
    h5: {
      fontSize: '1.142rem', // 16px
      lineHeight: '22px',
    },
    body1: {
      fontSize: '1rem', // 14px
      lineHeight: '19px',
    },
    body2: {
      fontSize: '0.928rem', // 13px
      lineHeight: '18px',
    },
    subtitle1: {
      fontSize: '0.857rem', // 12px
      lineHeight: '16px',
    },
    subtitle2: {
      fontSize: '0.785rem', // 11px
      lineHeight: '15px',
    },
    button: {
      height: 54,
      fontSize: '1rem',
      lineHeight: '19px',
      textTransform: 'none',
    },
  },
  palette: {
    primary: { main: '#3A8DFF' },
    grey: { main: '#b0b0b0' },
    white: '#ffffff',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {},
    },
  },
});

theme.overrides.MuiCssBaseline['@global'].html = {
  fontSize: '14px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '13px',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '16px',
  },
};

export default theme;
