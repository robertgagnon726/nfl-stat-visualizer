import {call, put, select, fork, join } from "@redux-saga/core/effects";
import axios from "axios";
import { addDataPoint, setChartDataLoading, setFormattedData } from "../actions";

// This is a free api key. I wouldn't normally leave this in the codebase but I am this time to allow easier local deployment
const encryptedKey = 'MGYxNTAwMGItM2ZlYy00ZjY5LTgyNGYtNDg2NTllOk1ZU1BPUlRTRkVFRFM'
axios.defaults.headers.common['Authorization'] = `Basic ${encryptedKey}`

/**
 * Gets a single player's yards for a single season
 * @param {string} player 
 * @param {string|number} season 
 */
export function* getPlayerSingleSeasonYards(player, season) {
  try {
    const response = yield call(axios, `https://scrambled-api.mysportsfeeds.com/v2.1/pull/nfl/${season}-regular/player_stats_totals.json?player=${player}`);

    const data = response.data.playerStatsTotals[0].stats.passing.passYards;
    const lineChart = yield select(state => state.chartData.lineChart);

    let stagedLC = { ...lineChart };
    stagedLC[season][player] = data;

    yield put(addDataPoint(stagedLC));
    yield put(setFormattedData(stagedLC));
  } catch (e) {
    console.log(e)
  }

}

/**
 * Triggers all the single player season data fetches in parallel
 */
export function* chartDataSaga() {
  const lineChart = yield select(state => state.chartData.lineChart);

  let tasks = [];

  let obj = Object.keys(lineChart);
  for (let i = 0; i < obj.length; i++) {  
    for (let j = 0; j < Object.keys(lineChart[obj[i]]).length; j++) {
      let task = yield fork(getPlayerSingleSeasonYards, Object.keys(lineChart[obj[i]])[j], obj[i]);
      tasks.push(task)
    }
  }
  yield join([...tasks]);
  
  yield put(setChartDataLoading(false))
}