import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip, Bar, BarChart, Cell } from 'recharts';
import PropTypes from 'prop-types';

import { addClickedColumn, removeClickedColumn, setVisibleStrokes } from '../../redux/actions';
import CustomizedDot from './CustomizedDot';

const height = 500;
const width = 1000;
const toolTipStyle = {
  backgroundColor: 'rgb(35, 48, 68)',
  border: 'none'
}

export default function QBSeasonalStats({ type }) {
  const data = useSelector(state => state.chartData.formattedData);
  const randomData = useSelector(state => state.chartData.randomData);
  const players = useSelector(state => state.chartData.players);
  const loading = useSelector(state => state.chartData.loading);
  const clicked = useSelector(state => state.chartData.clicked);
  const visibleStrokes = useSelector(state => state.chartData.visibleStrokes);

  const dispatch = useDispatch();

  const handleChartClick = (e) => {
    if (!e) return;
    if (clicked.includes(e.activeLabel)) {
      const index = clicked.indexOf(e.activeLabel);
      let stagedClicked = [ ...clicked ];

      stagedClicked.splice(index, 1);

      dispatch(removeClickedColumn(stagedClicked));
    } else {
      dispatch(addClickedColumn([...clicked, e.activeLabel]))
    }
  } 

  const handleLegendClick = (e) => {
    dispatch(setVisibleStrokes({...visibleStrokes, [e.dataKey]: !visibleStrokes[e.dataKey]}))
  }

  return (
    <React.Fragment>
    {type === 'line' ? (
      <LineChart 
        id="line-chart"
        width={width} 
        height={height} 
        data={loading ? randomData : data} 
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        onClick={(e) => handleChartClick(e)}
      >
      {players.map(player => (
        <Line 
          key={player.val} 
          type="monotone" 
          dataKey={player.val} 
          stroke={`rgb(${player.lineColor})`}
          width={5}
          hide={!visibleStrokes[player.val]}
          dot={<CustomizedDot />}
        />
      ))}

        <Legend 
          align="center" 
          verticalAlign="top"
          height={44}
          onClick={(e) => handleLegendClick(e)}
        />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip contentStyle={toolTipStyle} />
      </LineChart>
      ) : null}
      {type === 'bar' ? (
        <BarChart
          id="bar-chart"
          height={height}
          width={width}
          data={loading ? randomData : data} 
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          onClick={(e) => handleChartClick(e)}
        >
          {players.map(player => (
          <Bar 
            key={player.val} 
            dataKey={player.val} 
            fill={`rgb(${player.lineColor}, 1)`}
            hide={!visibleStrokes[player.val]}
          >
          {data.map((entry, index) => (
                <Cell 
                  cursor="pointer" 
                  fill={!clicked.includes(entry.name) ? 
                    `rgba(${player.lineColor}, 1)` : 
                    `rgba(${player.lineColor}, .3)`
                  } 
                  key={`cell-${index}`} 
                />
              ))}
          </Bar>
        ))}
          <Legend 
            align="center" 
            verticalAlign="top"
            height={44}
            onClick={(e) => handleLegendClick(e)}
          />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip cursor={{fill: 'rgba(27, 38, 53, .4)'}} contentStyle={toolTipStyle} />
        </BarChart>
      ) : null}
    </React.Fragment>
  )
}

QBSeasonalStats.propTypes = {
  type: PropTypes.string.isRequired
}