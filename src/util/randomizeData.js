import { players, years } from "./config";

export default function randomizeData() {
  const tempData = {};
  for (let i = 0; i < years.length; i++) {
    tempData[years[i]] = {}

    for (let j = 0; j < players.length; j++) {
      tempData[years[i]][players[j].val] = Math.random() * Math.floor(8000)
    }
  }
return tempData
}