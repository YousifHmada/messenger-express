import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUserInfo } from '../../redux/auth/actionCreators';
import { selectUserInfo, selectUserInfoStatus } from '../../redux/auth/selectors';
import { REQUEST_STATUS } from '../../redux/helpers/loadingCycle';

// Hook to fetch userInfo if not yet fetched
export const useFetchUserInfo = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const userInfoStatus = useSelector(selectUserInfoStatus);

  useEffect(() => {
    if (!userInfo && userInfoStatus === REQUEST_STATUS.IDLE) {
      dispatch(fetchUserInfo());
    }
  }, [userInfo, userInfoStatus]);

  return userInfo;
};

// Hook to listen for auth status changes and redirect loggedIn users
export const useRedirectOnLoggedInUser = () => {
  const history = useHistory();
  const userInfo = useFetchUserInfo();
  useEffect(() => {
    if (userInfo) {
      history.push('/dashboard');
    }
  }, [userInfo]);
};
