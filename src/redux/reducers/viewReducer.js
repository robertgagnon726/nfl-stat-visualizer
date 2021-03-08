import { SET_PAGE_VIEW } from "../../util/actionTypes";

const defaultState = {
  pageView: 'season-line-chart'
};

/**
 * 
 * @param {Object} state 
 * @param {Object} action 
 */
export default function viewReducer(state = defaultState, action) {
  switch(action.type) {
    case SET_PAGE_VIEW:
      return {...state, pageView: action.payload};
    default:
      return state;
  }
}