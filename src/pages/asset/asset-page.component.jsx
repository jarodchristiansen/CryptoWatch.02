import React from 'react';
import SocialChart from '../../components/social-chart/social-chart.component';
import DetailPanel from '../../components/detail-panel/detail-panel.component'; 

const AssetPage = (id) => (
  <div className='homepage'>
    <h1>{id.match.params.id}</h1>
    <DetailPanel id={id.match.params.id}/>
    <SocialChart id={id.match.params.id}/>
  </div>
);

export default AssetPage;
