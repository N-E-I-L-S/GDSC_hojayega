import React, { useEffect, useState } from 'react';
import { BarSeries,ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, DataLabel } from '@syncfusion/ej2-react-charts';

import { barCustomSeries, barPrimaryXAxis, barPrimaryYAxis } from '../../data/dummy';
import { ChartsHeader } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';

const Bar = () => {
  const { currentMode } = useStateContext();
  const [barData, setBarData] = useState([]);
  const [avgbarData, setAvgBarData] = useState([]);

  async function getData() {
    const res = await fetch('http://127.0.0.1:5000/repeat-purchase-rate');
    const json = await res.json();
    const formattedData = json.map(item => ({ x: item['visit freq'], y: item.Percentage}));
    setBarData(formattedData.slice(0,10));
  }

  useEffect(() => {
    getData();
  }, []);

  if (barData.length === 0)
    return <p>Loading...</p>;
  else {
    return (
      <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
        {/* Your other components */}
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
              <SeriesDirective dataSource={barData} xName="x" yName="y" type="Column" name="Percentage" />
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      </div>
    );
  }
};

export default Bar;