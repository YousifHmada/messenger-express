import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import store from './store';

export default function StateProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

StateProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
