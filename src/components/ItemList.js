import React, { Component } from 'react';
import { connect, bindActionCreators } from 'react-redux';
import { requestTrending } from '../redux/actions';
// import axios from 'axios';
import Loader from './Loader';
import Pagination from './Pagination';
import Item from './Item';

const LIMIT = 10;

export class ItemList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // items: [],
      searchValue: '',
      // loading: false,
      resultPage: props.params.id ? props.params.id : 1
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.params.id != this.props.params.id) {
      this.setState({
        resultPage: newProps.params.id
      });
    }
    if (!!newProps.params.id) {
      this.getTrending();
    }
  }

  componentWillMount() {
    debugger;
    const { requestTrending } = this.props;
    requestTrending();
  }

  // getTrending() {
  //   axios
  //     .get(
  //       `https://api.giphy.com/v1/gifs/trending?api_key=o0WkAgsV8Yu0S7pjGI1Bk594LxB49hGF&limit=${LIMIT}&rating=G`
  //     )
  //     .then(res => {
  //       this.setState({
  //         items: res.data.data
  //       });
  //     });
  // }

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
    const { items, resultPage } = this.state;
    const lowRange = (resultPage - 1) * 10;
    const newItems = items.slice(lowRange, lowRange + 10);
    return newItems.map(({ id, images, url }) => {
      return <Item key={id} url={url} images={images} />;
    });
  }

  render() {
    debugger;
    // const { loading, items, searchValue, resultPage } = this.state;
    const { resultPage, searchValue } = this.state;
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
  requestTrending
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
