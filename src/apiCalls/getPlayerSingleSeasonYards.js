import axios from "axios";

// This is a free api key. I wouldn't normally leave this in the codebase but I am this time to allow easier local deployment
const encryptedKey = 'MGYxNTAwMGItM2ZlYy00ZjY5LTgyNGYtNDg2NTllOk1ZU1BPUlRTRkVFRFM='
axios.defaults.headers.common['Authorization'] = `Basic ${encryptedKey}`

/**
 * 
 * @param {string} player 
 * @param {string|number} season 
 */
export default function getPlayerSingleSeasonYards(player, season) {
  try {
    return axios.get(
      `https://scrambled-api.mysportsfeeds.com/v2.1/pull/nfl/${season}-regular/player_stats_totals.json?player=${player}`
      ).then(response => {
        return response;
    });
  } catch (e) {
    console.log(e)
  }
}
