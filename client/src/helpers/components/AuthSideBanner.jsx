import React from 'react';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  image: {
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/bg-img.png)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  overlay: {
    backgroundImage:
      'linear-gradient(180deg, rgb(58,141,255, 0.75) 0%, rgb(134,185,255, 0.75) 100%)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
    paddingBottom: 145,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroText: {
    textAlign: 'center',
    color: theme.palette.white,
    marginTop: 40,
    maxWidth: 310,
  },
}));

export default function AuthSideBanner(props) {
  const classes = useStyles();

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Grid className={classes.image} {...props}>
      <Box className={classes.overlay}>
        <Hidden xsDown>
          <img
            width={67}
            height={66}
            alt="chat bubble"
            src={`${process.env.PUBLIC_URL}/images/chatBubble.png`}
          />
          <Hidden smDown>
            <Typography className={classes.heroText} component="p" variant="h3">
              Converse with anyone with any language
            </Typography>
          </Hidden>
        </Hidden>
      </Box>
    </Grid>
  );
}
