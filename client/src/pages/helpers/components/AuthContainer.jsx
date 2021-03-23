import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';

import AuthSideBanner from './AuthSideBanner';
import useStyles from '../hooks/authStylesOverrides';
import { useCallOnAuthVerified } from '../hooks/auth';
import { REQUEST_STATUS } from '../../../redux/helpers/loadingCycle';

export default function AuthContainer({ children, requestStatus, requestError }) {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  // Hook to open snakebar on request has error
  useEffect(() => {
    if (requestError) {
      setOpen(true);
    }
  }, [requestError]);

  // Hook to redirect to dashboard on request succeeded
  useEffect(() => {
    if (requestStatus === REQUEST_STATUS.SUCCEEDED) {
      history.push('/dashboard');
    }
  }, [requestStatus]);

  // Hook to redirect to dashboard if user is loggedIn
  useCallOnAuthVerified(() => history.push('/dashboard'), []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <AuthSideBanner item xs={false} sm={4} md={5} />
        <Grid item xs={12} sm={8} md={7} elevation={6} component={Paper} square>
          <Box className={classes.formContainer}>
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
        open={open}
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
