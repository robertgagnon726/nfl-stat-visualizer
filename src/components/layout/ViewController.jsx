import React from 'react';
import { useSelector } from 'react-redux';
import QBSeasonalStats from '../charts/QBSeasonalStats';

export default function ViewController() {
  const pageView = useSelector(state => state.view.pageView);

  return (
    <React.Fragment>
      {pageView === 'season-line-chart' ? <QBSeasonalStats type="line" /> : null}
      {pageView === 'season-bar-chart' ? <QBSeasonalStats type="bar" /> : null}
    </React.Fragment>
    )
}