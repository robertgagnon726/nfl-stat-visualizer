import { select, delay, put } from '@redux-saga/core/effects';
import convertData from '../../util/convertData';
import randomizeData from '../../util/randomizeData';
import { setRandomData } from '../actions';

/**
 * Sets loading data for application loading chart effect
 */
export function* initDataSaga() {
  const loading = yield select(state => state.chartData.loading);

  while (loading) {
    const randomData = randomizeData();
    const formattedData = convertData(randomData);

    yield put(setRandomData(formattedData))
    yield delay(1000)
  }
}