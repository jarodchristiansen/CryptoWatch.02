import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectDirectorySections } from '../../redux/directory/directory.selectors';

import MenuItem from '../menu-item/menu-item.component';

import './directory.styles.scss';

class Directory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sections: this.props.sections,
      query:''  
    };
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    });
  };


  handleSearchData = (sections, newSections, res, query) => {
    // {query.length >= 3 ? newSections.push(sections.find(res => res.symbol.includes(query.toUpperCase())))

    const newArray = sections.filter(res => res.symbol.includes(this.state.query.toUpperCase()))
    newArray.map(
      (y) =>
      newSections.push(y))
  }

  render() {
    const {query} = this.state;
    const {sections} = this.state;
    const newSections = [];
    const noValues = [];
    return (
    <div>
    <div>
      <input
        placeholder="Search for a token"
        ref={(input) => (this.search = input)}
        onChange={this.handleInputChange}
        className="dataRequest"
      />
      <h3>{query}</h3>
    </div>
      {/* <div className='directory-menu'>
        {this.state.sections.slice(0,80).map(({ id, ...otherSectionProps }) => (
          <MenuItem key={id} {...otherSectionProps} />
        ))}
      </div> */}

      <div className='directory-menu'>

        {sections.find(res => res.symbol == query.toUpperCase()) ? this.handleSearchData(sections, newSections) :       
        sections.find(res => res.symbol == query.toUpperCase()) == -1 ?
        noValues.push(<h1>'No matching Values'</h1>) :
        sections.slice(0,50).sort((a, b) => a.id- b.id).map(({ id, ...otherSectionProps }) => (
          <MenuItem key={id} {...otherSectionProps} />
        ))
        }
        

      </div>
      <div className="searchResult">

        {noValues.length >= 0 ? newSections.map(({ id, ...otherSectionProps }) => (
          <MenuItem key={id} categories={id.categories} {...otherSectionProps} />
        )) : noValues.map(({y}) => (
          <h1 key={y}>{y}</h1>
        ))
        }

        </div>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);
