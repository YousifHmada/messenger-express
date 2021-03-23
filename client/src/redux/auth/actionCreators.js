import { authSlice } from './reducer';

export const {
  userLoggedOut,
  userInfoLoading,
  userInfoSucceeded,
  userInfoFailed,
  loginLoading,
  loginSucceeded,
  registerLoading,
  registerSucceeded,
} = authSlice.actions;

// eslint-disable-next-line no-unused-vars
export const register = ({ username, email, password }) => (dispatch) => {
  dispatch(registerLoading());
  setTimeout(() => {
    localStorage.setItem('user', JSON.stringify({ username, email })); // Just for test, will clean that in a following PR
    dispatch(registerSucceeded());
  }, 1000);
};

// eslint-disable-next-line no-unused-vars
export const login = ({ email, password }) => (dispatch) => {
  dispatch(loginLoading());
  setTimeout(() => {
    localStorage.setItem('user', JSON.stringify({ username: email, email })); // Just for test, will clean that in a following PR
    dispatch(loginSucceeded());
  }, 1000);
};

// eslint-disable-next-line no-unused-vars
export const fetchUserInfo = () => (dispatch) => {
  dispatch(userInfoLoading());
  setTimeout(() => {
    const userInfo = JSON.parse(localStorage.getItem('user')); // Just for test, will clean that in a following PR

    if (userInfo) {
      dispatch(userInfoSucceeded(userInfo));
    } else {
      dispatch(userInfoFailed()); // Just for test, will clean that in a following PR
    }
  }, 1000);
};

// eslint-disable-next-line no-unused-vars
export const logout = () => (dispatch) => {
  setTimeout(() => {
    localStorage.removeItem('user'); // Just for test, will clean that in a following PR
  }, 1000);
  dispatch(userLoggedOut());
};
