import { combineReducers } from 'redux';
import chartDataReducer from './chartDataReducer';
import viewReducer from './viewReducer'

const rootReducer = combineReducers({
  view: viewReducer,
  chartData: chartDataReducer
})

export default rootReducer;