import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, TextField, Box, Grid, Typography } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';

import AuthContainer from '../helpers/components/AuthContainer';
import AuthBtnHeader from '../helpers/components/AuthBtnHeader';
import useStyles from '../helpers/hooks/authStyles';
import { register } from '../redux/auth/actionCreators';
import { selectRegisterStatus, selectRegisterError } from '../redux/auth/selectors';
import { REQUEST_STATUS } from '../redux/helpers/loadingCycle';

export default function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const registerStatus = useSelector(selectRegisterStatus);
  const registerError = useSelector(selectRegisterError);

  const handleSubmit = ({ username, email, password }) => {
    dispatch(register({ username, email, password }));
  };

  const disabled = registerStatus === REQUEST_STATUS.LOADING;

  return (
    <AuthContainer requestStatus={registerStatus} requestError={registerError}>
      <AuthBtnHeader to="/login" noAccBtnText="Already have an account?" accBtnText="Login" />

      <Box width="100%" maxWidth={424} p={3} alignSelf="center">
        <Grid container>
          <Grid item xs>
            <Typography className={classes.welcome} component="h1" variant="h3">
              Create an account
            </Typography>
          </Grid>
        </Grid>
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string().required('Username is required').max(40, 'Username is too long'),
            email: Yup.string().required('Email is required').email('Email is not valid'),
            password: Yup.string()
              .required('Password is required')
              .max(100, 'Password is too long')
              .min(6, 'Password too short'),
          })}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit: handleFormikSubmit, handleChange, values, touched, errors }) => (
            <form onSubmit={handleFormikSubmit} className={classes.form} noValidate>
              <TextField
                id="username"
                label="Username"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{ classes: { input: classes.inputs } }}
                name="username"
                autoComplete="username"
                autoFocus
                helperText={touched.username ? errors.username : ''}
                error={touched.username && Boolean(errors.username)}
                value={values.username}
                onChange={handleChange}
                disabled={disabled}
              />
              <TextField
                id="email"
                label="E-mail address"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{ classes: { input: classes.inputs } }}
                name="email"
                autoComplete="email"
                helperText={touched.email ? errors.email : ''}
                error={touched.email && Boolean(errors.email)}
                value={values.email}
                onChange={handleChange}
                disabled={disabled}
              />
              <TextField
                id="password"
                label="Password"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  classes: { input: classes.inputs },
                }}
                type="password"
                autoComplete="current-password"
                helperText={touched.password ? errors.password : ''}
                error={touched.password && Boolean(errors.password)}
                value={values.password}
                onChange={handleChange}
                disabled={disabled}
              />

              <Box textAlign="center">
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={disabled}
                >
                  Create
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </AuthContainer>
  );
}
