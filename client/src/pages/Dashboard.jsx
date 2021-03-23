import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../redux/auth/actionCreators';
import { selectUserInfo } from '../redux/auth/selectors';

export default function Dashboard() {
  const history = useHistory();
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);

  const handleLogout = () => {
    dispatch(logout());
    history.push('/login');
  };

  return (
    <>
      {/* For testing purposes right now, ignore styling */}
      <p>Dashboard</p>
      <p>User: {JSON.stringify(userInfo)}</p>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}
