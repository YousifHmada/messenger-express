/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectUserInfoStatus } from '../../redux/auth/selectors';
import { REQUEST_STATUS } from '../../redux/helpers/loadingCycle';
import { useFetchUserInfo } from '../hooks/auth';

/**
 * This will act as a HOC to provide auth info to the given children,
 * pass all props to the WrappedRoute and manage access to the protected view
 */
export function withAuth(Component) {
  return function ProtectedComponent() {
    const history = useHistory();
    const userInfo = useFetchUserInfo();
    const userInfoStatus = useSelector(selectUserInfoStatus);

    // Hook to redirect to login page if fetch userInfo failed
    useEffect(() => {
      if (!userInfo && userInfoStatus === REQUEST_STATUS.FAILED) {
        history.push('/login');
      }
    }, [userInfo, userInfoStatus]);

    return userInfo ? <Component /> : <span>loading...</span>;
  };
}

export default function ProtectedRoute({ component, ...rest }) {
  return <Route {...rest} component={withAuth(component)} />;
}

ProtectedRoute.propTypes = {
  component: PropTypes.node.isRequired,
};
