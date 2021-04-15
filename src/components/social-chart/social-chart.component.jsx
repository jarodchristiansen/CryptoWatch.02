import React from 'react';
import { TradingViewEmbed, widgetType } from "react-tradingview-embed";
import FirstChart from '../../components/firstchart/first-chart.components';
import NewsContainer from '../news/news-container.component';

class SocialChart extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        id: this.props.id
      }
    }
  
      
      componentDidMount() {
            // console.log(this.state.id)
    }
    render() {
      return (
        <div>
          <div>
        <TradingViewEmbed
                widgetType={widgetType.ADVANCED_CHART}
                widgetConfig={{
                  interval: "1D",
                  colorTheme: "dark",
                  width: "100%",
                  symbol: this.state.id.replace(/['"]+/g, '') + "USD" || 'BTCUSD',
                  studies: [
                    "MACD@tv-basicstudies",
                    "StochasticRSI@tv-basicstudies",
                    "TripleEMA@tv-basicstudies"
                  ]
                }}
              />
              <div>
                  <div>
            <FirstChart id={this.state.id}/>
         
            </div>
              </div>
        </div>
        </div>
  
      );
    }
  }
  
  export default SocialChart;
  