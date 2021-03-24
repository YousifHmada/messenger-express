import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, Box, CssBaseline } from '@material-ui/core';

import theme from './theme';
import useStyles from './styles';

export default function ThemeProvider({ children }) {
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline>
        <Box className={classes.root}>{children}</Box>
      </CssBaseline>
    </MuiThemeProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
