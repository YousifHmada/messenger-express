/* eslint-disable import/prefer-default-export */
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../../redux/auth/selectors';

// This Hook will listen for auth status changes and invoke the cb on auth verified
export const useCallOnAuthVerified = (cb, deps = []) => {
  const userInfo = useSelector(selectUserInfo);
  useEffect(() => {
    if (userInfo) {
      cb();
    }
  }, [userInfo, ...deps]);
};
