import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  header: {
    fontSize: '48px',
    fontWeight: 1000,
    marginTop: '30px',
  },
}));

export default function MintingProgress() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress color="white" size={60} thickness={5}/>
      <Typography className={classes.header}>MINTING</Typography>
      <Typography className={classes.content}>Do not exit out of this page</Typography>
    </div>
  );
}