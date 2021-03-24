import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Paper, Box, Grid, IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import AuthSideBanner from './AuthSideBanner';
import useStyles from '../hooks/authStyles';
import { useRedirectOnLoggedInUser } from '../hooks/auth';
import { useRedirectOnSuccess } from '../hooks/requestStatus';

export default function AuthContainer({ children, requestStatus, requestError }) {
  const classes = useStyles();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Hook to open snakebar on request has error
  useEffect(() => {
    if (requestError) {
      setOpenSnackbar(true);
    }
  }, [requestError]);

  // Hook to redirect to dashboard on request succeeded
  useRedirectOnSuccess(requestStatus, '/dashboard');

  // Hook to redirect to dashboard if user is loggedIn
  useRedirectOnLoggedInUser();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <AuthSideBanner item xs={false} sm={4} md={5} />
        <Grid item xs={12} sm={8} md={7} elevation={6} component={Paper} square>
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
            flexDirection="column"
            flexWrap="wrap"
            className={classes.formContainer}
          >
            {children}
            <Box p={1} alignSelf="center" />
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        message={requestError && requestError.message}
        action={
          <>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </>
  );
}

AuthContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  requestStatus: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  requestError: PropTypes.object,
};

AuthContainer.defaultProps = {
  requestError: undefined,
};
