import React from 'react';
import { ChartsHeader } from '../../components';
import LineChartyr from "../../components/Charts/YearlyLineChart"
const description = ""
const Line = () => (
  <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
    <ChartsHeader category="Line" title="Inflation Rate" description={description}/>
    <div className="w-full">
      <LineChartyr />
    </div>
  </div>
);

export default Line;
