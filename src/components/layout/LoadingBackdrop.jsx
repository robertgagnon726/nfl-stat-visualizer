import React from 'react';
import { useSelector } from 'react-redux';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  backdrop: {
    zIndex: 1100,
    color: '#fff',
  },
}));


export default function LoadingBackdrop() {
  const classes = useStyles();
  const loading = useSelector(state => state.chartData.loading)
  return (
    <Backdrop id="loader-backdrop" className={classes.backdrop} open={loading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}