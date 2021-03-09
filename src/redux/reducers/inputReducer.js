import { SET_INPUT_ERROR, SET_PLAYER_INPUT, SET_PLAYER_PENDING } from "../../util/actionTypes";

const defaultState = {
  playerInput: '',
  playerInputPending: false,
  inputError: {
    error: false,
    title: "Error",
    message: "There was an error"
  }
};

/**
 * 
 * @param {Object} state 
 * @param {Object} action 
 */
export default function viewReducer(state = defaultState, action) {
  switch(action.type) {
    case SET_PLAYER_INPUT:
      return {...state, playerInput: action.payload};
    case SET_PLAYER_PENDING:
      return {...state, playerInputPending: action.payload};
    case SET_INPUT_ERROR:
      return {...state, inputError: { ...action.payload }}
    default:
      return state;
  }
}