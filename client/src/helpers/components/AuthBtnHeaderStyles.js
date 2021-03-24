import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
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
