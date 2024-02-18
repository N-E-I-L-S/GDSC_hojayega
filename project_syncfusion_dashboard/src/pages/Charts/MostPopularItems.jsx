import React, { useEffect, useState } from 'react';
import { BarSeries,ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, DataLabel } from '@syncfusion/ej2-react-charts';

import { barCustomSeries, barPrimaryXAxis, barPrimaryYAxis } from '../../data/dummy';
import { ChartsHeader } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';

const Bar = () => {
  const { currentMode } = useStateContext();
  const [barData, setBarData] = useState([]);

  async function getData() {
    const res = await fetch('http://127.0.0.1:5000/customer-segmentation-most-popular-items');
    const json = await res.json();
    const formattedData = json.map(item => ({ x: item.category, y: item.count }));
    setBarData(formattedData.slice(0,10).reverse());
  }

  useEffect(() => {
    getData();
  }, []);
  const description = "This graph illustrates the popularity of different categories within the 'Cold Coffee' segment, providing insights into customer preferences and guiding business decisions related to menu offerings."
  if (barData.length === 0)
    return <p>Loading...</p>;
  else {
    return (
      <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
        <ChartsHeader title={"Popularity of Category"} description={description} /> 
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
            <Inject services={[BarSeries, Legend, Tooltip, Category, DataLabel]} />
            <SeriesCollectionDirective>
              <SeriesDirective dataSource={barData} xName="x" yName="y" type="Bar" name="Popularity Count" />
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      </div>
    );
  }
};

export default Bar;