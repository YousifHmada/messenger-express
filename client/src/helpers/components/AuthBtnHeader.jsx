import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  accBtn: {
    minWidth: 140,
    backgroundColor: theme.palette.white,
    color: theme.palette.primary.main,
    filter: 'drop-shadow(0px 2px 6px rgba(74,106,149,0.2))',
    boxShadow: 'none',
    borderRadius: 5,
    marginRight: 41,
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
    },
  },
  noAccBtn: {
    color: theme.palette.grey.main,
    whiteSpace: 'nowrap',
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: 21,
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
    },
  },
  link: {
    textDecoration: 'none',
    display: 'flex',
  },
}));

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
