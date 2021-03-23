import React from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';

import Route from './pages/helpers/components/Route';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import store from './redux/store';
import theme from './themes/theme';
import useStyles from './themes/overrides';

function App() {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline>
          <Box className={classes.root}>
            <BrowserRouter className={classes.root}>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/dashboard" authRequired component={Dashboard} />
              <Route exact path="/">
                <Redirect to="/signup" />
              </Route>
            </BrowserRouter>
          </Box>
        </CssBaseline>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
