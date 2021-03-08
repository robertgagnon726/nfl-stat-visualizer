import axios from "axios";

/**
 * 
 * @param {string} player 
 * @param {string|number} season 
 */
export default function getPlayerSingleSeasonYards(player, season) {
  return axios.get(
    `https://scrambled-api.mysportsfeeds.com/v2.1/pull/nfl/${season}-regular/player_stats_totals.json?player=${player}`
    ).then(response => {
      return response.data.playerStatsTotals[0].stats.passing.passYards
  });
}
