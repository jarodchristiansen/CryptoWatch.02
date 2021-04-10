import React from 'react';
import './detail-panel.styles.scss';
import SocialData from '../social-data/social-data.component';

class DetailPanel extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        id: this.props.id,
        description: '',
        forum: '',
        github: '',
        reddit: '',
        telegram: '',
        website: '',
        whitepaper: '',
      }
    }
  
    loadChartData = async () => {
        const response = await fetch(
          `https://api.lunarcrush.com/v2?data=meta&key=688o9wuzvzst3uybpg6eh&symbol=${this.state.id}&type=full`


          );
        const data = await response.json();
        // const dominanceData = [];
        // const globalDominance = [];
        const dataArray = [];
        // const socialDataRaw = [];

        const Data = data["data"][0];
        console.log(Data)
        this.setState({
            description: Data.description,
            forum: Data.forum_link,
            github: Data.github_link,
            reddit: Data.reddit_link,
            telegram: Data.telegram_link,
            website: Data.website_link,
            whitepaper: Data.whitepaper_link
        })
    }
      
      componentDidMount() {
         this.loadChartData()   
    }
    render() {
        const {description, forum, github, reddit, telegram, website, whitepaper} = this.state;
      return (
        <div className="detailPanel">
            <p>{description}</p>
       
            <a href={forum} target="#" className="detailLink">Forum Link</a>
            <a href={github}  target="#" className="detailLink">Github Link</a>
            <a href={reddit}  target="#" className="detailLink">Reddit Link</a>
            <SocialData id={this.props.id}/>
            {/* <h2>{this.state.id}</h2> 
            {newsDataArray.map((y) => {
                return(<NewsItem props={y}/>)
            })} */}
         </div>
  
      );
    }
  }
  
  export default DetailPanel;
  