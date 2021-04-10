import React from 'react';

import { TradingViewEmbed, widgetType } from "react-tradingview-embed";

import './crypto-screener.styles.scss';


const Screener = () => (
  <div className='screener'>

    
<TradingViewEmbed
        className="screener"
        widgetType={widgetType.SCREENER_CRYPTOCURRENCY}
        widgetConfig={{
          width: "100%",
          height: "700",
          colorTheme: "dark",
          defaultColumn: "performance",

        }}
      />

  </div>
);

export default Screener;
