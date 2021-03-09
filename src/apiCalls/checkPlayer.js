import axios from "axios";

/**
 * Checks if the My Sports Feed API contains a player
 * @param {string} player 
 */
export default function checkPlayer(player) {
  try {
  const encryptedKey = 'MGYxNTAwMGItM2ZlYy00ZjY5LTgyNGYtNDg2NTllOk1ZU1BPUlRTRkVFRFM='
  axios.defaults.headers.common['Authorization'] = `Basic ${encryptedKey}`

  return axios.get(
    `https://scrambled-api.mysportsfeeds.com/v2.1/pull/nfl/players.json?player=${player}`
    ).then(response => {
      return response.data.players.length;
  });
  } catch (e) {
    console.log(e)
  }
}
