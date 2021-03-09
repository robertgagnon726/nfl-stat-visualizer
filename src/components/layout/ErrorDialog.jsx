import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setInputError } from '../../redux/actions';

const useStyles = makeStyles(() => ({

}))

export default function ErrorDialog() {
  const classes = useStyles();
  const { error, title, message } = useSelector(state => state.inputs.inputError);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setInputError({
      error: false,
      title,
      message
    }))
  }

  return(
    <Dialog open={error} onClose={handleClose} classes={{paper: classes.paper}}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  )
}