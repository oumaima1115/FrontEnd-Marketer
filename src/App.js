import './App.css';
import React, { useEffect, useState } from 'react';
import InfluencerChartComponent from './InfluencerChartComponent.js';
import LeadsChartComponent from './LeadsChartComponent.js';
import influencerData from './influencer.json';
import leadsData from './leads.json';

function App() {
  const [data, setData] = useState([]);
  const [dataTwo, setDataTwo] = useState([]);

  useEffect(() => {
    const dataArray = Object.values(influencerData);
    setData(dataArray);
    const dataArrayTwo = Object.values(leadsData);
    setDataTwo(dataArrayTwo);
  }, []);

  return (
    <div className="App">
      <body>
        <InfluencerChartComponent data={data}/>
        <LeadsChartComponent data={dataTwo}/>
      </body>
    </div>
  );
}

export default App;
