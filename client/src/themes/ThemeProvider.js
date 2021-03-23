import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';

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
