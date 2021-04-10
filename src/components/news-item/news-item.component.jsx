import React from 'react';
import './news-item.styles.scss';

class NewsItem extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        time: this.props.props.time,
        thumbnail: this.props.props.thumbnail,
        publisher: this.props.props.publisher,
        sentiment: this.props.props.sentiment,
        social_score: this.props.props.social_score,
        url: this.props.props.url,
        name: this.props.props.name,
        description: this.props.props.description
    }
    }
  
   
      componentDidMount() {
    }
    render() {
        const {time, thumbnail, publisher, sentiment, social_score,
        url, name, description } = this.state;
      return (
        <div className="newsItem">
            <a href={url} className="newsAnchor" target="#">
         <div className="ImgContain">
            <img src={thumbnail} className="newsImage"></img>
            <div className="description">
                <p className="descriptionDetails">{description}</p>
           </div>
            </div>
            <div className="detailsRow">           
            <h4 className="date">{time}</h4>
            <h4 className="date">{publisher}</h4>
            <h4 className="date">{sentiment}</h4>
            <h4 className="date">{social_score}</h4>
            <h4 className="date">{name}</h4>    
            </div>
            </a>
        </div>
  
      );
    }
  }
  
  export default NewsItem;
  