/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUserInfo } from '../../../redux/auth/actionCreators';
import { selectUserInfo, selectUserInfoStatus } from '../../../redux/auth/selectors';
import { REQUEST_STATUS } from '../../../redux/helpers/loadingCycle';

/**
 * This will act as a HOC to provide auth info to the given children,
 * pass all props to the WrappedRoute and manage access to the protected view
 */
function withAuth(WrappedComponent) {
  function ComponentWithAuth({ children }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUserInfo);
    const userInfoStatus = useSelector(selectUserInfoStatus);

    // Hook to fetch userInfo if not yet fetched
    useEffect(() => {
      if (!userInfo && userInfoStatus === REQUEST_STATUS.IDLE) {
        dispatch(fetchUserInfo());
      }
    }, [userInfo, userInfoStatus]);

    // Hook to redirect to login page if fetch userInfo failed
    useEffect(() => {
      if (!userInfo && userInfoStatus === REQUEST_STATUS.FAILED) {
        history.push('/login');
      }
    }, [userInfo, userInfoStatus]);

    return <WrappedComponent>{userInfo ? children : 'loading...'}</WrappedComponent>;
  }

  ComponentWithAuth.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  };

  return ComponentWithAuth;
}

export default function WrappedRoute({ authRequired, component, ...rest }) {
  return <Route {...rest} component={authRequired ? withAuth(component) : component} />;
}

WrappedRoute.propTypes = {
  component: PropTypes.node.isRequired,
  authRequired: PropTypes.bool,
};
WrappedRoute.defaultProps = {
  authRequired: false,
};
