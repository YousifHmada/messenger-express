import { createSlice } from '@reduxjs/toolkit';

import createLoadingCycle, { REQUEST_STATUS } from '../helpers/loadingCycle';

const userInfoLC = createLoadingCycle('userInfo');
const loginLC = createLoadingCycle('login');
const registerLC = createLoadingCycle('register');
const logoutLC = createLoadingCycle('logout');

const initialState = {
  ...userInfoLC.initialState,
  ...registerLC.initialState,
  ...loginLC.initialState,
  ...logoutLC.initialState,
  userInfo: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    ...userInfoLC.reducers,
    ...registerLC.reducers,
    ...loginLC.reducers,
    ...logoutLC.reducers,
    /**
     * UserInfo {
     *  username: String;
     *  email: String
     * }
     * @param {UserInfo} action [userInfo]
     */
    userInfoSucceeded: (state, action) => ({
      ...state,
      userInfo: action.payload,
      userInfoStatus: REQUEST_STATUS.SUCCEEDED,
      userInfoError: undefined,
    }),
    /**
     * @param {UserInfo} action [userInfo]
     */
    registerSucceeded: (state, action) => ({
      ...state,
      userInfo: action.payload,
      registerStatus: REQUEST_STATUS.SUCCEEDED,
      registerError: undefined,
    }),
    /**
     * @param {UserInfo} action [userInfo]
     */
    loginSucceeded: (state, action) => ({
      ...state,
      userInfo: action.payload,
      loginStatus: REQUEST_STATUS.SUCCEEDED,
      loginError: undefined,
    }),
    logoutLoading: (state) => ({
      ...state,
      ...initialState, // Reset to intialState
      userInfoStatus: REQUEST_STATUS.FAILED, // Set userInfoStatus to failed to stop any attempts to fetch userInfo
      logoutStatus: REQUEST_STATUS.LOADING,
    }),
  },
});

export default authSlice.reducer;
