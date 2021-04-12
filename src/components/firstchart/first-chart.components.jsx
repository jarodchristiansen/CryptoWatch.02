import React from 'react';
import './first-chart.styles.scss'
import NewsContainer from '../news/news-container.component';

import {
  XYPlot,
  Hint,
  LineSeries,
  FlexibleXYPlot,
  VerticalBarSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
  AreaSeries
} from "react-vis";

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});


class FirstChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      domData: [],
      times: [],
      high: [],
      low: [],
      chartData: [],
      dominanceData: [],
      globalDominance: [],
      leaderboard: [],
      addressData: "",
      globalDom: [],
      socialData: []
    }
  }

  loadChartData = async () => {
    const response = await fetch(
      `https://api.lunarcrush.com/v2?data=assets&key=688o9wuzvzst3uybpg6eh&symbol=${this.state.id}&data_points=90&interval=day`
    );
    const data = await response.json();
    const dominanceData = [];
    const globalDominance = [];
    const dataArray = [];
    const socialDataRaw = [];
    const bulkData = data["data"][0]["timeSeries"];

    {
      //       {'alt_rank': 68,
      //  'alt_rank_30d': 1,
      //  'alt_rank_hour_average': 67.5,
      //  'asset_id': 1,
      //  'average_sentiment': 3.7,
      //  'close': 6386.524282,
      //  'correlation_rank': 2.1,
      //  'galaxy_score': 65.5,
      //  'high': 6637.495629,
      //  'low': 6376.026672,
      //  'market_cap': 121742730091,
      //  'market_cap_global': 179221529538,
      //  'market_cap_rank': 1,
      //  'market_dominance': 67.92863022920866,
      //  'medium': 9,
      //  'news': 32,
      //  'open': 6615.590272,
      //  'percent_change_24h': -5.359897389031679,
      //  'percent_change_24h_rank': 1181,
      //  'price_btc': 1,
      //  'price_score': 3.2,
      //  'reddit_comments': 1220,
      //  'reddit_comments_score': 7056,
      //  'reddit_posts': 750,
      //  'reddit_posts_score': 7493,
      //  'search_average': 0,
      //  'sentiment_absolute': 3,
      //  'sentiment_relative': 88,
      //  'social_contributors': 33606,
      //  'social_dominance': 40.1267535794715,
      //  'social_impact_score': 4.1,
      //  'social_score': 251117697,
      //  'social_score_24h_rank': 1,
      //  'social_volume': 77687,
      //  'social_volume_24h_rank': 1,
      //  'social_volume_global': 193604,
      //  'time': 1585267200,
      //  'tweet_favorites': 41808,
      //  'tweet_followers': 251029684,
      //  'tweet_quotes': 1767,
      //  'tweet_replies': 6776,
      //  'tweet_retweets': 14048,
      //  'tweet_sentiment1': 2110,
      //  'tweet_sentiment2': 4002,
      //  'tweet_sentiment3': 12777,
      //  'tweet_sentiment4': 41891,
      //  'tweet_sentiment5': 4137,
      //  'tweet_sentiment_impact1': 34443028,
      //  'tweet_sentiment_impact2': 18542872,
      //  'tweet_sentiment_impact3': 34051565,
      //  'tweet_sentiment_impact4': 151168686,
      //  'tweet_sentiment_impact5': 12887932,
      //  'tweet_spam': 7054,
      //  'tweets': 64917,
      //  'unique_url_shares': 10768,
      //  'url_shares': 15551,
      //  'volatility': 0.01787143,
      //  'volume': 34118585169,
      //  'volume_24h_rank': 2,
      //  'youtube': 92}
      bulkData.map(
        (y) =>
          dataArray.push({
            x: y.time * 1000,
            y: y.market_cap
          }),
        bulkData.map(
          (y) =>
            dominanceData.push({
              x: y.time * 1000,
              y: y.market_cap_global * (y.market_dominance / 100),
              z: y.market_dominance
            }),
          bulkData.map((y) =>
            socialDataRaw.push({
              x: y.time * 1000,
              y: y.social_score,
              z: y.social_dominance
            })
          ),
          bulkData.map((y) =>
            globalDominance.push({
              x: y.time * 1000,
              y: y.market_cap_global
            })
          )
        )
      );
    }
    this.setState({
      chartData: dataArray,
      dominanceData,
      globalDominance,
      socialDataRaw
    });
    // this.setState({ symbol: this.props.symbol });
  };
    
    componentDidMount() {
      this.loadChartData()

          console.log(this.state.id)
  }
  render() {
    const { chartData, id, addressData, domData, globalDom, globalDominance, dominanceData } = this.state;
    return (
      <div className="topRow">
      <div className="chartContainer">
      <div className="addressHover">
                <HoverHint
                  data={addressData}
                  dom={domData}
                  global={globalDom}
                  query={this.state.id}
                  symbol={this.state.id}
                />
              </div>
              <FlexibleXYPlot className="onChainChart" height={350}>
                <VerticalBarSeries
                  data={chartData}
                  opacity={0.3}
                  color={"#40FEFF"}
                  onNearestX={(datapoint, event) => {
                    this.setState({
                      addressData: {
                        time: new Date(datapoint.x).toLocaleDateString(),
                        price: datapoint.y
                      }
                    });
                  }}
                />
                <VerticalBarSeries
                  data={globalDominance}
                  opacity={0.3}
                  color={"#40FEFF"}
                  onNearestX={(datapoint, event) => {
                    this.setState({
                      globalDom: {
                        time: new Date(datapoint.x).toLocaleDateString(),
                        price: datapoint.y
                      }
                    });
                  }}
                />
                <LineSeries
                  data={dominanceData}
                  strokeWidth={2.5}
                  stroke={"#E0115F"}
                  style={{ backgroundColor: "white"}}
                  onNearestX={(datapoint, event) => {
                    this.setState({
                      domData: {
                        time: new Date(datapoint.x).toLocaleDateString(),
                        score: datapoint.z
                      }
                    });
                  }}
                />
  
                <XAxis
                  tickFormat={(value) =>
                    new Date(value).toLocaleDateString().split(" ")
                  }
                  tickValues={chartData.x}
                  title={"Dates"}
                  style={{
                    line: { stroke: "#ffffff" },
                    ticks: { stroke: "#ffffff" },
                    text: {
                      stroke: "none",
                      fill: "#ffffff",
                      fontWeight: 5,
                      fontSize: 8,
                      position: "start"
                    },
                    title: { fill: "#ffffff" }
                  }}
                />
                <YAxis
                  tickFormat={(value) => value / 1}
                  tickValues={chartData.y}
                  // title={"Active Number of Addresses"}
                  style={{
                    line: { stroke: "#ffffff", marginRight: 50 },
                    ticks: { stroke: "#fffff" },
                    text: {
                      stroke: "none",
                      fill: "#ffffff",
                      fontWeight: 3,
                      fontSize: 7,
                      position: "start"
                    },
                    title: { fill: "#ffffff" }
                  }}
                />
              </FlexibleXYPlot>
              </div>
            <div className="newsContainer">
              <NewsContainer id={this.state.id} />
                </div>
      </div>
      

    );
  }
}

 
const HoverHint = ({ active, data, query, symbol, dom, global }) => (
  <div className={(`nonActive ${active ? "active" : ""}`, "hoverHint")}>
    <p className="hoverData">
      {data.length > 1
        ? query
        : symbol.toUpperCase() + "  - Market Cap ($USD)/Market Dominance"}
    </p>
    <p className="hoverData">
      {data.length < 1 ? "" : data.time + " - " + formatter.format(data.price)}{" "}
    </p>
    <p className="hoverData">
      {data.length < 1
        ? ""
        : "Market Domianance - " +
          Number(dom.score / 100).toLocaleString(undefined, {
            style: "percent",
            minimumFractionDigits: 2
          })}
    </p>
    <p className="hoverData">
      {data.length < 1
        ? ""
        : "Global Market Total " + formatter.format(global.price)}
    </p>
    {/* <p className="hoverData">{data.length > 1 ? "Number of Addresses" + data.price : data.price}</p> */}
  </div>
);



export default FirstChart;
