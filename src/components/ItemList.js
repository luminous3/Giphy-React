import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect, bindActionCreators } from 'react-redux';
import { fetchTrending, fetchSearchResults } from '../redux/actions';
import Loader from './Loader';
import Pagination from './Pagination';
import Item from './Item';

export class ItemList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: ''
    };
  }

  componentWillMount() {
    const { fetchTrending } = this.props;
    fetchTrending();
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps.params.id);
    // if (!newProps.params.id) {
    //   alert('no id');
    // }
  }

  handleKeyPress(event) {
    if (event.charCode === 13) {
      document.getElementById('search').blur();
      const { fetchSearchResults, query } = this.props;
      fetchSearchResults(this.state.searchValue);
      hashHistory.push({
        pathname: `/pages/1/${query}`
      });
    }
  }

  renderItems() {
    const { items } = this.props;
    let newItems = items;
    const resultPage = this.props.params.id;

    if (resultPage) {
      // search result page
      const lowRange = (resultPage - 1) * 10;
      newItems = items.slice(lowRange, lowRange + 10);
    }

    return newItems.map(({ id, images, url }) => {
      return <Item key={id} url={url} images={images} />;
    });
  }

  render() {
    const { searchValue } = this.state;
    const resultPage = this.props.params.id ? this.props.params.id : 1;
    const { items, isFetching, query } = this.props;

    return (
      <div className="wrapper">
        <input
          id="search"
          onKeyPress={this.handleKeyPress.bind(this)}
          onChange={event => this.setState({ searchValue: event.target.value })}
          value={searchValue}
          placeholder={'Search All GIFs'}
        />
        <div className="trending-title">
          {query === '' ? 'Top Trending Gifs' : `Results for '${query}'`}
        </div>
        {isFetching && <Loader />}
        {!isFetching && (
          <div>
            {items.length && (
              <ul className="gif-container">{this.renderItems()}</ul>
            )}
            {query && (
              <Pagination items={items} resultPage={resultPage} query={query} />
            )}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.items,
    isFetching: state.isFetching,
    query: state.query
  };
}

const mapDispatchToProps = {
  fetchTrending,
  fetchSearchResults
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
