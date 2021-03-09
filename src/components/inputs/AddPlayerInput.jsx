import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, makeStyles, TextField } from '@material-ui/core';
import { setPlayerInput, setPlayerPending } from '../../redux/actions';

const useStyles = makeStyles(() => ({
  root: {
    '& fieldset': {
      borderColor: 'white !important',
      ':hover': {
        borderColor: 'white'
      }
    },
    '& p': {
      color: 'white'
    },
    '& input': {
      color: 'white'
    }
  }
}))

export default function AddPlayerInput() {
  const playerInput = useSelector(state => state.inputs.playerInput);
  const playerPending = useSelector(state => state.inputs.playerInputPending);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleInputChange = (e) => {
    if (e.target === undefined || !e.target.value === undefined) return;
    
    dispatch(setPlayerInput(e.target.value));
  }

  const handleOnBlur = () => {
    if (playerInput.length > 0) {
      dispatch(setPlayerPending(true))
    }
  }

  return (
    <React.Fragment>
      <TextField
        id="add-player-input"
        size="small"
        classes={classes}
        value={playerInput}
        variant="outlined"
        placeholder="Add a player"
        onChange={(e) => handleInputChange(e)}
        onBlur={handleOnBlur}
        disabled={playerPending}
        autoComplete="off"
        fullWidth
        InputProps={{
          endAdornment:
          playerPending ? <CircularProgress size={20} style={{color: 'white'}} /> : null
          }}
      />
    </React.Fragment>
  )
}