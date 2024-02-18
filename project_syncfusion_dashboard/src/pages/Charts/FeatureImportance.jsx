import React, { useEffect, useState } from 'react';
import { BarSeries,ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, DataLabel } from '@syncfusion/ej2-react-charts';

import { barCustomSeries, barPrimaryXAxis, barPrimaryYAxis } from '../../data/dummy';
import { ChartsHeader } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';

const Bar = () => {
  const { currentMode } = useStateContext();
  const [barData, setBarData] = useState([]);

  async function getData() {
    const res = await fetch('http://127.0.0.1:5000/feature_importances');
    const json = await res.json();
    const formattedData = json.map(item => ({ x: item.Feature, y: item.Importance }));
    setBarData(formattedData.slice(0,10).reverse());
  }

  useEffect(() => {
    getData();
  }, []);
  const description = "This graph illustrates the contribution of various features to the total revenue, emphasizing the significant impact of the 'Quantity' feature. The analysis is based on a dataset with five features, and the graph provides a clear visual representation of how each feature influences the overall revenue."
  if (barData.length === 0)
    return <p>Loading...</p>;
  else {
    return (
      <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
        <ChartsHeader title={"Feature Importance (ML)"} description={description} /> 
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
              <SeriesDirective dataSource={barData} xName="x" yName="y" type="Bar" name="Importance" />
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      </div>
    );
  }
};

export default Bar;