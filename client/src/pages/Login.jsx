import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';

import AuthContainer from '../helpers/components/AuthContainer';
import AuthBtnHeader from '../helpers/components/AuthBtnHeader';
import useStyles from '../helpers/hooks/authStyles';
import { login } from '../redux/auth/actionCreators';
import { selectLoginStatus, selectLoginError } from '../redux/auth/selectors';

export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loginStatus = useSelector(selectLoginStatus);
  const loginError = useSelector(selectLoginError);

  const handleSubmit = ({ email, password }) => {
    dispatch(login({ email, password }));
  };

  return (
    <AuthContainer requestStatus={loginStatus} requestError={loginError}>
      <AuthBtnHeader
        to="/signup"
        noAccBtnText="don't have an acount?"
        accBtnText="Create account"
      />

      <Box width="100%" maxWidth={424} p={3} alignSelf="center">
        <Grid container>
          <Grid item xs>
            <Typography className={classes.welcome} component="h1" variant="h3">
              Welcome back!
            </Typography>
          </Grid>
        </Grid>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={Yup.object().shape({
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
                autoFocus
                helperText={touched.email ? errors.email : ''}
                error={touched.email && Boolean(errors.email)}
                value={values.email}
                onChange={handleChange}
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
                  endAdornment: <Typography className={classes.forgot}>Forgot?</Typography>,
                }}
                type="password"
                autoComplete="current-password"
                helperText={touched.password ? errors.password : ''}
                error={touched.password && Boolean(errors.password)}
                value={values.password}
                onChange={handleChange}
              />

              <Box textAlign="center">
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Login
                </Button>
              </Box>

              <div style={{ height: 95 }} />
            </form>
          )}
        </Formik>
      </Box>
    </AuthContainer>
  );
}
