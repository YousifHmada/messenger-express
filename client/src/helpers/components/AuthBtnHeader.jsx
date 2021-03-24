import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@material-ui/core';

import useStyles from './AuthBtnHeaderStyles';

export default function AuthBtnHeader({ to, noAccBtnText, accBtnText }) {
  const classes = useStyles();

  return (
    <Box p={1} display="flex" alignSelf="flex-end" alignItems="center">
      <Typography className={classes.noAccBtn}>{noAccBtnText}</Typography>
      <Link to={to} className={classes.link} tabIndex="-1">
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
