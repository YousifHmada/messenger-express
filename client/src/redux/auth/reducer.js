import { createSlice } from '@reduxjs/toolkit';

import createLoadingCycle, { REQUEST_STATUS } from '../helpers/loadingCycle';

const userInfoLC = createLoadingCycle('userInfo');
const loginLC = createLoadingCycle('login');
const registerLC = createLoadingCycle('register');

const initialState = {
  ...userInfoLC.initialState,
  ...registerLC.initialState,
  ...loginLC.initialState,
  userInfo: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    ...userInfoLC.reducers,
    ...registerLC.reducers,
    ...loginLC.reducers,
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
    registerSucceeded: (state) => ({
      ...state,
      ...userInfoLC.initialState, // Reset UserInfo state
      registerStatus: REQUEST_STATUS.SUCCEEDED,
      registerError: undefined,
    }),
    loginSucceeded: (state) => ({
      ...state,
      ...userInfoLC.initialState, // Reset UserInfo state
      loginStatus: REQUEST_STATUS.SUCCEEDED,
      loginError: undefined,
    }),
    userLoggedOut: () => ({
      ...initialState, // Reset to intialState
    }),
  },
});

export default authSlice.reducer;
