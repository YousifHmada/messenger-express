import { authSlice } from './reducer';
import { api, extractErrorPayload } from '../helpers/api';

const {
  userInfoLoading,
  userInfoSucceeded,
  userInfoFailed,
  loginLoading,
  loginSucceeded,
  loginFailed,
  registerLoading,
  registerSucceeded,
  registerFailed,
  logoutLoading,
  logoutSucceeded,
  logoutFailed,
} = authSlice.actions;

export const register = ({ username, email, password }) => async (dispatch) => {
  dispatch(registerLoading());
  try {
    await api.post('/auth/register', {
      username,
      email,
      password,
    });
    dispatch(registerSucceeded());
  } catch (error) {
    dispatch(registerFailed(extractErrorPayload(error)));
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  dispatch(loginLoading());
  try {
    await api.post('/auth/login', {
      email,
      password,
    });
    dispatch(loginSucceeded());
  } catch (error) {
    dispatch(loginFailed(extractErrorPayload(error)));
  }
};

export const fetchUserInfo = () => async (dispatch) => {
  dispatch(userInfoLoading());
  try {
    const { data } = await api.get('/auth/userInfo');
    dispatch(userInfoSucceeded(data));
  } catch (error) {
    dispatch(userInfoFailed(extractErrorPayload(error)));
  }
};

export const logout = () => async (dispatch) => {
  dispatch(logoutLoading());
  try {
    await api.post('/auth/logout');
    dispatch(logoutSucceeded());
  } catch (error) {
    dispatch(logoutFailed(extractErrorPayload(error)));
  }
};
