import { select, call, fork, put, takeEvery, join } from "@redux-saga/core/effects";
import _ from 'lodash';
import checkPlayer from "../../apiCalls/checkPlayer";
import { SET_PLAYER_PENDING } from "../../util/actionTypes";
import { years } from "../../util/config";
import { rgbGenerator } from "../../util/rgbGenerator";
import { setInputError, setPlayerInput, setPlayerPending, setPlayers, setVisibleStrokes } from "../actions";
import { getSingleSeasonYards } from "./chartDataSaga";

/**
 * Validates whether or not the players should be updated
 * @param {number} playerCount 
 */
export function* validatePlayerCount(playerCount) {
  if (playerCount === 0) {
    yield put(setInputError({
      error: true,
      title: 'Error',
      message: 'There are no players with that name'
    }))
    yield put(setPlayerInput(''))
    yield put(setPlayerPending(false))
    return false;
  } else if (playerCount > 1) {
    yield put(setInputError({
      error: true,
      title: 'Error',
      message: 'There is more than one player with that name'
    }))
    yield put(setPlayerInput(''))
    yield put(setPlayerPending(false))
    return false;
} else {
  return true;
}
}

export function* getPlayer() {
  try {
    // Prevents duplicate calls
    const pending = yield select(state => state.inputs.playerInputPending);
    if (!pending) return;

    let player = yield select(state => state.inputs.playerInput);

    player = _.kebabCase(player);

    const players = yield select(state => state.chartData.players);

    // Checks if player is already in the dataset
    if (players.filter((e) =>  e.val === player).length > 0) {
      yield put(setInputError({
        error: true,
        title: 'Error',
        message: 'This player is already on the chart'
      }))
      yield put(setPlayerInput(''))
      yield put(setPlayerPending(false))
      return;
    }

    const playerCount = yield call(checkPlayer, player);
    const validCount = yield validatePlayerCount(playerCount);

    if (validCount) {
      const strokes = yield select(state => state.chartData.visibleStrokes);

      // Fetches the new player data
      let tasks = [];
      for (let i = 0; i < years.length; i++) {
        let task = yield fork(getSingleSeasonYards, player, years[i], true);
        tasks.push(task)
      }

      // Adds player to visible strokes array
      strokes[player] = true;
      players.push({
        val: player,
        lineColor: rgbGenerator(),
        displayName: _.startCase(player)
      })

      yield put(setVisibleStrokes(strokes))
      yield put(setPlayers(players))
      yield join([...tasks]);

      yield put(setPlayerInput(''))
      yield put(setPlayerPending(false))
    }
  } catch (e) {
    console.log(e)
  }
}

export function* getNewPlayerSaga() {
  yield takeEvery(SET_PLAYER_PENDING, getPlayer);
}