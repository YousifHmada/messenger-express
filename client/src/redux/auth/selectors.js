export const selectAuth = (state) => state.auth;
export const selectUserInfo = (state) => selectAuth(state).userInfo;
export const selectUserInfoStatus = (state) => selectAuth(state).userInfoStatus;
export const selectUserInfoError = (state) => selectAuth(state).userInfoError;
export const selectLoginStatus = (state) => selectAuth(state).loginStatus;
export const selectLoginError = (state) => selectAuth(state).loginError;
export const selectRegisterStatus = (state) => selectAuth(state).registerStatus;
export const selectRegisterError = (state) => selectAuth(state).registerError;
