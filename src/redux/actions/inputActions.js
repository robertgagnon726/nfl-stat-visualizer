import { SET_INPUT_ERROR, SET_PLAYER_INPUT, SET_PLAYER_PENDING } from "../../util/actionTypes";

/**
 * Updates the player name input value
 * @param {string} name 
 */
export const setPlayerInput = (name) => ({
  type: SET_PLAYER_INPUT,
  payload: name
})

/**
 * Sets the value for if there is a pending change to the players list
 * @param {boolean} bool 
 */
export const setPlayerPending = (bool) => ({
  type: SET_PLAYER_PENDING,
  payload: bool
})

/**
 * 
 * @param {object} obj - The input error object
 * @param {boolean} obj.error - Toggles error state
 * @param {string} obj.title - Title of the error message
 * @param {string} obj.message - The error message
 */
export const setInputError = (obj) => ({
  type: SET_INPUT_ERROR,
  payload: obj
})