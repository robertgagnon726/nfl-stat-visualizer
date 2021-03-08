/**
 * Sets initial chart data
 * @param {array} players 
 */
export const setInitialLineChart = (players) => {
  const tempData = {};
  for (let i = 0; i <= 5; i++) {
    tempData[i + 2015] = {}

    for (let j = 0; j < players.length; j++) {
      tempData[i + 2015][players[j].val] = null
    }
  }
return tempData
}

/**
 * Sets all players' datasets as visible on the charts
 * @param {array} players 
 */
export const setInitialVisibleStrokes = (players) => {
  const tempVisibleStrokes = {};
  players.forEach(player => {
    tempVisibleStrokes[player.val] = true
  })
  return tempVisibleStrokes;
}