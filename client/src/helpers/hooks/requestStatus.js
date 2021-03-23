/* eslint-disable import/prefer-default-export */
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { REQUEST_STATUS } from '../../redux/helpers/loadingCycle';

// Hook to redirect user on request succeeded
export const useRedirectOnSuccess = (requestStatus, to) => {
  const history = useHistory();
  useEffect(() => {
    if (requestStatus === REQUEST_STATUS.SUCCEEDED) {
      history.push(to);
    }
  }, [requestStatus]);
};
