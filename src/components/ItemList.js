import React, { Component } from 'react';
import { connect, bindActionCreators } from 'react-redux';
import { fetchTrending } from '../redux/actions';
import Loader from './Loader';
import Pagination from './Pagination';
import Item from './Item';

const LIMIT = 10;

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
      this.handleSearch();
    }
  }

  handleSearch() {
    const { searchValue } = this.state;
    this.setState({
      loading: true
    });

    axios
      .get(
        `https://api.giphy.com/v1/gifs/search?api_key=o0WkAgsV8Yu0S7pjGI1Bk594LxB49hGF&q=${searchValue}&limit=25&offset=0&rating=G&lang=en`
      )
      .then(res => {
        this.setState({
          loading: false,
          items: res.data.data,
          resultPage: 1
        });
      });
  }

  renderItems() {
    const { items } = this.props;
    const resultPage = this.props.params.id;
    const lowRange = (resultPage - 1) * 10;
    const newItems = items.slice(lowRange, lowRange + 10);
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
            {items.length > LIMIT && (
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
  fetchTrending
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
