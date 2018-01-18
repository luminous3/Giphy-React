import React, { Component } from 'react';
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

  handleKeyPress(event) {
    if (event.charCode === 13) {
      document.getElementById('search').blur();
      const { fetchSearchResults } = this.props;
      fetchSearchResults(this.state.searchValue);
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
    const resultPage = this.props.params.id;
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
            {resultPage && (
              <Pagination
                items={items}
                resultPage={resultPage}
                searchValue={searchValue}
              />
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
