import React from 'react';
import SocialChart from '../../components/social-chart/social-chart.component';

const AssetPage = (id) => (
  <div className='homepage'>
    {console.log(id)}
    <h1>{id.match.params.id}</h1>
    <SocialChart id={id.match.params.id}/>
  </div>
);

export default AssetPage;
