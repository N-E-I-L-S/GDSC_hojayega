import React, { useEffect, useState } from 'react';
import DataTable from '../components/DataTable'; // Replace with the path to your DataTable component

const MainComponent = () => {
  const [tableData, setTableData] = useState([]);
  const [uniqueSegments, setUniqueSegments] = useState([]);
  const [uniqueOrderTypes, setUniqueOrderTypes] = useState([]);

 

  async function getData() {
    const res = await fetch('http://127.0.0.1:5000/get-customer-table',{
      // headers:{
      //   'Content-Type': 'application/json',
      //   'Accept': 'application/json',
        
      // }
    }); // Replace with your API endpoint
    const json = await res.json();
    console.log(json);
    // Get unique values for Segment and Order Type
    const uniqueSegments = [...new Set(json.map(item => item['Segment']))];
    
    setUniqueSegments(['All', ...uniqueSegments]); // Include 'All' option in the dropdown
   
    setTableData(json);
  }
  useEffect(() => {
    getData();
  }, []);
  if(tableData.length === 0) return <div>Loading data...</div>;
  return (
    <div>
      {/* Render your DataTable component */}
      <DataTable data={tableData} uniqueSegments={uniqueSegments}/>
    </div>
  );
};

export default MainComponent;
