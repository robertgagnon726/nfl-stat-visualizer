import { ADD_CLICKED_COLUMN, ADD_DATA_POINT, REMOVE_CLICKED_COLUMN, SET_CHART_DATA_LOADING, SET_FORMATTED_DATA, SET_RANDOM_DATA, SET_VISIBLE_STROKES } from "../../util/actionTypes";
import convertData from "../../util/convertData";

/**
 * Updates the object type data
 * @param {Object} data - The updated data
 */
export const addDataPoint = (data) => {

    return {
      type: ADD_DATA_POINT,
      payload: data
    }
}

/**
 * Converts data type from object to recharts ingestible data(array type)
 * @param {Object} data - The updated data
 */
export const setFormattedData = (data) => {
  const formattedData = convertData(data);
  return {
    type: SET_FORMATTED_DATA,
    payload: formattedData
  }
}

/**
 * Sets loading state
 * @param {bool} bool 
 */
export const setChartDataLoading = (bool) => ({
  type: SET_CHART_DATA_LOADING,
  payload: bool
})

/**
 * Adds column to array for active click state
 * @param {array} clicked  - The updated clicked array
 */
export const addClickedColumn = (clicked) => ({
  type: ADD_CLICKED_COLUMN,
  payload: clicked
})

/**
 * Removes column from array for active click state
 * @param {array} clicked - The updated clicked array 
 */
export const removeClickedColumn = (clicked) => ({
  type: REMOVE_CLICKED_COLUMN,
  payload: clicked
})

/**
 * Updates which player's datasets are visible
 * @param {object} strokes 
 */
export const setVisibleStrokes = (strokes) => ({
  type: SET_VISIBLE_STROKES,
  payload: strokes
})

/**
 * Sets the randomized data for the charts to use while loading
 * @param {array} data 
 */
export const setRandomData = (data) => ({
  type: SET_RANDOM_DATA,
  payload: data
})