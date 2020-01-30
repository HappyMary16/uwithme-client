import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  copyright: {
    marginTop: '10px'
  }
}));

export const Copyright = () => {
  const classes = useStyles();

  return (
    <Box xs={12}>
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        className={classes.copyright}
      >
        {'Copyright © Mariia Borodin '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  );
};
