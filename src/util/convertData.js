/**
 * Converts chart data from an object to an array that can be ingested by recharts.js
 * @param {object} raw 
 */
export default function convertData(raw) {
  let arr = [];

  let rawKeys = Object.keys(raw);

  rawKeys.forEach((key, i) => {
    arr.push({name: key})
    let subKeys = Object.keys(raw[key])
    for (let j = 0; j < subKeys.length; j++) {
      arr[i][subKeys[j]] = raw[key][subKeys[j]];
    }
  })

  return arr;
}