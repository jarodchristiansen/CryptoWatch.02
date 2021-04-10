import React from 'react';
import './social-data.styles.scss';


class SocialData extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        id: this.props.id,
      
      }
    }
  
    loadChartData = async () => {
        const response = await fetch(
          `https://api.lunarcrush.com/v2?data=assets&key=688o9wuzvzst3uybpg6eh&symbol=${this.state.id}`
          

          );
        const data = await response.json();
        // const dominanceData = [];
        // const globalDominance = [];
        const dataArray = [];
        // const socialDataRaw = [];

        const Data = data["data"][0];
        console.log(Data)
        this.setState({
            average_sentiment: Data.average_sentiment,
            galaxy_score: Data.galaxy_score,
            max_supply: Data.max_supply,
            volatility: Data.volatility,
            volume: Data.volume_24h,
            percent_change_7d: Data.percent_change_7d,
            percent_change_24h: Data.percent_change_24h,
            percent_change_30d: Data.percent_change_30d,
            social_volume: Data.social_volume_calc_24h,
            social_contributors: Data.social_contributors_calc_24h,
            tweets: Data.tweets,
            tweet_followers: Data.tweet_followers,
            tweet_reweets: Data.tweet_retweets,

        })
    }
      
      componentDidMount() {
         this.loadChartData()   
    }
    render() {
      const {id, average_sentiment, galaxy_score, max_supply, volatility, volume, percent_change_7d, percent_change_24h, percent_change_30d,
    social_volume, social_contributors, tweets, tweet_followers, tweet_retweets} = this.state;
      return (
        <div className="socialPanel">
        <h5 className="detail">Average Sentiment Score: {average_sentiment}</h5>
        <h5 className="detail">Max Supply: {max_supply}</h5>      
        <h5 className="detail">Volatility: {volatility}</h5>     
        <h5 className="detail">Volume: {volume}</h5>      
        <h5 className="detail">Social Volume: {social_volume}</h5>
        <h5 className="detail">Social Contributors: {social_contributors}</h5>
        <h5 className="detail">Tweets: {tweets}</h5>
        <h5 className="detail">Tweet Followers: {tweet_followers}</h5>
        <h5 className="detail">Percent Change 24Hr: {percent_change_24h}</h5>
        <h5 className="detail">Percent Change 7D: {percent_change_7d}</h5>
        <h5 className="detail">Percent Change 30D: {percent_change_30d}</h5>            
         </div>
  
      );
    }
  }
  
  export default SocialData;
  