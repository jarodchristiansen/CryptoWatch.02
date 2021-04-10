import React from 'react';
import { TradingViewEmbed, widgetType } from "react-tradingview-embed";
import FirstChart from '../../components/firstchart/first-chart.components';

class SocialChart extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        id: this.props.id
      }
    }
  
      
      componentDidMount() {
            console.log(this.state.id)
    }
    render() {
      return (
        <div className='shop-page'>
          <div className="symbol-row">
        <h2 className="symbol">{this.state.symbol} </h2><h2 className="symbol"> - {this.state.title}  - </h2><img className="symbol-image" src={this.state.imageURL} />
        <p>{this.state.description}</p>
          </div>
          <div className="firstCharts">
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
              <div className="marketDomChart">
            <FirstChart id={this.state.id}/>
              </div>
        </div>
        </div>
  
      );
    }
  }
  
  export default SocialChart;
  