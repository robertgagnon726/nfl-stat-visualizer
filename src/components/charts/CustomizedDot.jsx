import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const CustomizedDot = ({ cx, cy, payload, stroke }) => {
  const clicked = useSelector(state => state.chartData.clicked);

  if (clicked.includes(payload.name)) {
    return (
      <svg x={cx - 4} y={cy - 4} width={8} height={8} fill="white">
        <g transform="translate(4 4)">
          <circle r="4" fill="black" />
          <circle className="recharts-data-point-click" r="4" fill={stroke} />
        </g>
      </svg>
    );
  } else {
    return (
      <svg x={cx - 4} y={cy - 4} width={8} height={8} fill="white">
        <g transform="translate(4 4)">
          <circle r="4" fill="black" />
          <circle className="recharts-data-point-no-click" r="4" fill="white" />
        </g>
      </svg>
    );
  }
};

export default CustomizedDot;

CustomizedDot.propTypes = {
  cx: PropTypes.number,
  cy: PropTypes.number,
  payload: PropTypes.object,
  stroke: PropTypes.string
}