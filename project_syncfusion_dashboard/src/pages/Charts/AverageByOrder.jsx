import React, { useEffect, useState } from 'react';
import { BarSeries,ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, DataLabel } from '@syncfusion/ej2-react-charts';

import { barCustomSeries, barPrimaryXAxis, barPrimaryYAxis } from '../../data/dummy';
import { ChartsHeader } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';

const Bar = () => {
  const { currentMode } = useStateContext();
  const [avgbarData, setAvgBarData] = useState([]);

  async function getData() {
    const res = await fetch('http://127.0.0.1:5000/avg-value-order-type');
    const json = await res.json();
    const formattedData = json.map(item => ({ x: item.Area, y: item.avg_value}));
    setAvgBarData(formattedData.slice(0,10));
  }

  useEffect(() => {
    getData();
  }, []);
  const description = "The graph illustrates the distribution and utilization of different dining order types within a specified time frame. Dining order types represent various ways customers engage with the dining establishment, reflecting diverse preferences and service offerings."
  if (avgbarData.length === 0)
    return <p>Loading...</p>;
  else {
    return (
      <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
        {/* Your other components */}
        <ChartsHeader title={"Average Revenue by Order Type"} description={description}/>
        <div className="w-full">
          <ChartComponent
            id="charts"
            primaryXAxis={barPrimaryXAxis}
            primaryYAxis={barPrimaryYAxis}
            chartArea={{ border: { width: 0 } }}
            tooltip={{ enable: true }}
            background={currentMode === 'Dark' ? '#33373E' : '#fff'}
            legendSettings={{ background: 'white' }}
            palettes={["#967259"]}
          >
            <Inject services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]} />
            <SeriesCollectionDirective>
              <SeriesDirective dataSource={avgbarData} xName="x" yName="y" type="Column" name="Average Revenue" />
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      </div>
    );
  }
};

export default Bar;