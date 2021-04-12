import React from 'react';
import { withRouter } from 'react-router-dom';

import './menu-item.styles.scss';

const MenuItem = ({ title, imageUrl, size, history, linkUrl, symbol, match }) => (
  <div
    className={`${size} menu-item`}
    onClick={() => history.push(`${match.url}${linkUrl}`, {title})}
  >
    <div
      className='background-image'
      style={{
        backgroundImage: `url(${imageUrl})`
      }}
    />
    <div className='content'>
      {title.length > 7 ? <h1 className='title'>{symbol}</h1>: <h1 className='title'>{title.toUpperCase()}</h1>} 
      <span className='subtitle'>{symbol}</span>
    </div>
  </div>
);

export default withRouter(MenuItem);
