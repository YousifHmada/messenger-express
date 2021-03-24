import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  accBtn: {
    minWidth: '10rem', // 140px
    backgroundColor: theme.palette.white,
    color: theme.palette.primary.main,
    filter: 'drop-shadow(0px 2px 6px rgba(74,106,149,0.2))',
    boxShadow: 'none',
    borderRadius: '5px',
    marginRight: '2.929rem', // 41px
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
    },
  },
  noAccBtn: {
    display: 'block',
    color: theme.palette.grey.main,
    whiteSpace: 'nowrap',
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: '1.5rem', // 21px
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
    },
  },
  link: {
    textDecoration: 'none',
  },
}));
