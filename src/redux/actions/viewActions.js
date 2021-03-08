import { SET_PAGE_VIEW } from "../../util/actionTypes";

/**
 * Changes the view between the different charts
 * @param {String} view 
 */
export const setPageView = (view) => ({
  type: SET_PAGE_VIEW,
  payload: view
})