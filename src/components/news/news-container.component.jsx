import React from 'react';
import { TradingViewEmbed, widgetType } from "react-tradingview-embed";
import FirstChart from '../../components/firstchart/first-chart.components';
import NewsItem from '../news-item/news-item.component';

const API_KEY = process.env.REACT_APP_API_KEY;

class NewsContainer extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        id: this.props.id,
        newsDataArray : [],
      }
    }
  
    loadChartData = async () => {
        const response = await fetch(
          `https://api.lunarcrush.com/v2?data=feeds&key=${API_KEY}&symbol=${this.state.id}&limit=4&sources=news`
          );
        const data = await response.json();
        // const dominanceData = [];
        // const globalDominance = [];
        const dataArray = [];
        // const socialDataRaw = [];

        const newsData = data["data"];
        newsData.map(
            (y) =>
              dataArray.push({
                time: new Date(y.time * 1000).toLocaleDateString(),
                average_sentiment: y.average_sentiment,
                sentiment: y.sentiment,
                name: y.name,
                publisher: y.publisher,
                shares: y.shares,
                social_score: y.social_score,
                thumbnail: y.thumbnail,
                url: y.url,
                image: y.image,
                description: y.description
              }))
              this.setState({
                  newsDataArray: dataArray
              })
    }
      
      componentDidMount() {
         this.loadChartData()   
    }
    render() {
        const {newsDataArray} = this.state;
      return (
        <div className="newsContainer">
            <h2>{this.state.id}</h2> 
            {newsDataArray.map((y) => {
                return(<NewsItem key={y.description} props={y}/>)
            })}
         </div>
  
      );
    }
  }
  
  export default NewsContainer;
  