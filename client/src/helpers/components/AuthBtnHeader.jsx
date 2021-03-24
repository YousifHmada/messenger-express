import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import useStyles from './AuthBtnHeaderStyles';

export default function AuthBtnHeader({ to, noAccBtnText, accBtnText }) {
  const classes = useStyles();

  return (
    <Box p={1} alignSelf="flex-end" alignItems="center">
      <Link to={to} className={classes.link}>
        <Button className={classes.noAccBtn}>{noAccBtnText}</Button>
        <Button color="default" className={classes.accBtn} variant="contained">
          {accBtnText}
        </Button>
      </Link>
    </Box>
  );
}

AuthBtnHeader.propTypes = {
  to: PropTypes.string.isRequired,
  noAccBtnText: PropTypes.string.isRequired,
  accBtnText: PropTypes.string.isRequired,
};
