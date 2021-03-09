import { combineReducers } from 'redux';
import chartDataReducer from './chartDataReducer';
import viewReducer from './viewReducer';
import inputReducer from './inputReducer';

const rootReducer = combineReducers({
  view: viewReducer,
  chartData: chartDataReducer,
  inputs: inputReducer
})

export default rootReducer;