import React, { useEffect, useState } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, DateTime, Legend, Tooltip } from '@syncfusion/ej2-react-charts';

import { LinePrimaryXAxishr, LinePrimaryYAxishr } from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';

const LineChart = () => {
  const { currentMode } = useStateContext();
  const [yrtrend, setYrTrend] = useState([])

  async function getData(){
    const res = await fetch('http://127.0.0.1:5000/hourly-transactions')
    const json = await res.json();
    console.log(json)
    
    setYrTrend(json.map(item => {
      // Assuming a fixed date, e.g., January 1, 2024
      const dateObject = new Date(2024, 0, 1, item.Hour, 0, 0, 0); // (year, month, day, hours, minutes, seconds, milliseconds)
      return { "x": dateObject, "y": item["Total Sales"] };
    }))
  }

  useEffect(()=>{
    getData()
  },[])
  if(yrtrend.lenght==0)
  return <div>Loading...</div>
  return (
    <ChartComponent
      id="line-chart"
      height="420px"
      primaryXAxis={LinePrimaryXAxishr}
      primaryYAxis={LinePrimaryYAxishr}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={currentMode === 'Dark' ? '#33373E' : '#fff'}
      legendSettings={{ background: 'white' }}
    >
      <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <SeriesDirective dataSource={yrtrend} xName="x" yName="y" name="Trend" />
        {/* {yrtrend.map((item, index) => <SeriesDirective key={index} {...item} />)} */}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default LineChart;
