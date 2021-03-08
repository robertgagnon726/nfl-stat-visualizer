import { ADD_CLICKED_COLUMN, ADD_DATA_POINT, REMOVE_CLICKED_COLUMN, SET_CHART_DATA_LOADING, SET_FORMATTED_DATA, SET_RANDOM_DATA, SET_VISIBLE_STROKES } from "../../util/actionTypes";
import { players } from "../../util/config";
import { setInitialLineChart, setInitialVisibleStrokes } from "../../util/setInitialState";

const defaultState = {
  lineChart: setInitialLineChart(players),
  loading: true,
  clicked: [],
  visibleStrokes: setInitialVisibleStrokes(players),
  formattedData: [],
  randomData: []
};

/**
 * 
 * @param {Object} state 
 * @param {Object} action 
 */
export default function chartDataReducer(state = defaultState, action) {
  switch(action.type) {
    case SET_FORMATTED_DATA:
      return { ...state, formattedData: [...action.payload] }
    case ADD_DATA_POINT:
      return {
        ...state, 
        lineChart: { ...state.lineChart, ...action.payload }
      };
    case SET_CHART_DATA_LOADING:
      return {...state, loading: action.payload};
    case ADD_CLICKED_COLUMN:
      return {...state, clicked: [...action.payload]};
    case REMOVE_CLICKED_COLUMN:
      return {...state, clicked: [...action.payload]};
    case SET_VISIBLE_STROKES:
      return {...state, visibleStrokes: {...action.payload}};
    case SET_RANDOM_DATA:
      return {...state, randomData: [...action.payload]}
    default:
      return state;
  }
}