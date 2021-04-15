import React from 'react';
import './detail-panel.styles.scss';
import SocialData from '../social-data/social-data.component';

const API_KEY = process.env.REACT_APP_API_KEY;

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
          `https://api.lunarcrush.com/v2?data=meta&key=${API_KEY}&symbol=${this.state.id}&type=full`
          );
        const data = await response.json();
        // const dominanceData = [];
        // const globalDominance = [];
        const dataArray = [];
        // const socialDataRaw = [];

        const Data = data["data"][0];
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
            <p className="description">{description}</p>

            <SocialData id={this.props.id}/>     
            <a href={forum} target="#" className="detailLink"><img src="https://www.pngkey.com/png/full/907-9079371_forum-icon.png" className="linkLogo"></img>Forum</a>
            <a href={github}  target="#" className="detailLink"><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" className="linkLogo"></img>Github</a>
            <a href={reddit}  target="#" className="detailLink"><img src="https://external-preview.redd.it/iDdntscPf-nfWKqzHRGFmhVxZm4hZgaKe5oyFws-yzA.png?auto=webp&s=38648ef0dc2c3fce76d5e1d8639234d8da0152b2" className="linkLogo"></img>Reddit</a>
  
            {/* <h2>{this.state.id}</h2> 
            {newsDataArray.map((y) => {
                return(<NewsItem props={y}/>)
            })} */}
         </div>
  
      );
    }
  }
  
  export default DetailPanel;
  