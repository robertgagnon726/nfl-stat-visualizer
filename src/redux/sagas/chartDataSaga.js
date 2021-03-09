import {call, put, select, fork, join } from "@redux-saga/core/effects";
import getPlayerSingleSeasonYards from "../../apiCalls/getPlayerSingleSeasonYards";
import { addDataPoint, setChartDataLoading, setFormattedData } from "../actions";

/**
 * Gets a single player's yards for a single season
 * @param {string} player 
 * @param {string|number} season 
 */
export function* getSingleSeasonYards(player, season) {
  try {
    const response = yield call(getPlayerSingleSeasonYards, player, season);

    let data;

    if (response.data.playerStatsTotals[0]) {
      data = response.data.playerStatsTotals[0].stats.passing.passYards;
    } else {
      data = 0
    }

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
      let task = yield fork(getSingleSeasonYards, Object.keys(lineChart[obj[i]])[j], obj[i]);
      tasks.push(task)
    }
  }
  yield join([...tasks]);
  
  yield put(setChartDataLoading(false))
}