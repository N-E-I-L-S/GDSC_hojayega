import React from 'react';
import { ChartsHeader } from '../../components';
import LineChart from "../../components/Charts/HourlyLineChart"
const description = "The graph shows that every morning at 6 a.m. the sales is least and grows steadily till evening. There is a steady decline after 6 p.m. and spikes again from 9 p.m. Maximum sales is at midnight "
const Line = () => (
  <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
    <ChartsHeader category="Line" title="Hourly Sales" description={description}/>
    <div className="w-full">
      <LineChart />
    </div>
  </div>
);

export default Line;
