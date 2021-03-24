import React from 'react';
import { Box, Hidden, Grid, Typography } from '@material-ui/core';

import useStyles from './AuthSideBannerStyles';

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
