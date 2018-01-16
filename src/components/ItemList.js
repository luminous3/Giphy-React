import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import _ from 'lodash';

const LIMIT = 10;
// const API_KEY = 'o0WkAgsV8Yu0S7pjGI1Bk594LxB49hGF';
// const RATING = 'G';
// const GIPHY_BASE_URL = 'https://api.giphy.com/v1/gifs/';

export class ItemList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      searchValue: '',
      loading: false,
      resultPage: props.params.id ? props.params.id : 1,
      totalPages: 1
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://api.giphy.com/v1/gifs/trending?api_key=o0WkAgsV8Yu0S7pjGI1Bk594LxB49hGF&limit=${LIMIT}&rating=G`
      )
      .then(res => {
        console.log(res.data.data);
        this.setState({ items: res.data.data });
      });
  }

  handleKeyPress(event) {
    if (event.charCode === 13) {
      document.getElementById('search').blur();
      this.handleSearch();
    }
  }

  handleSearch() {
    const { searchInput } = this.state;
    this.setState({
      loading: true
    });
    axios
      .get(
        `https://api.giphy.com/v1/gifs/search?api_key=o0WkAgsV8Yu0S7pjGI1Bk594LxB49hGF&q=${searchInput}&limit=25&offset=0&rating=G&lang=en`
      )
      .then(res => {
        console.log(res.data.data);
        this.setState({
          loading: false,
          items: res.data.data
        });
      });
  }

  renderItems() {
    const { items, resultPage } = this.state;
    return items.map(({ id, images, url }) => {
      return (
        <li key={id} className="gif-item">
          <a href={url} target="_blank">
            <img
              src={images.fixed_width_downsampled.url}
              className="preview"
              alt="Gif Preview"
            />
          </a>
        </li>
      );
    });
  }

  renderPagination() {
    console.log(resultPage);
    const { items, resultPage, totalPages } = this.state;
    const pages = Math.ceil(items.length / LIMIT);

    const links = _.range(1, pages + 1).map(page => {
      return (
        <li
          key={'page' + page}
          className={page === resultPage ? 'active' : 'waves-effect'}
        >
          <Link to={`/pages/${page}`}>{page}</Link>
        </li>
      );
    });

    return (
      <ul className="pagination">
        <li className={resultPage === 1 ? 'disabled' : ''}>
          <Link to={`/pages/${resultPage - 1}`}>
            <i className="material-icons">chevron_left</i>
          </Link>
        </li>
        {links}
        <li className={resultPage === pages + 1 ? 'disabled' : ''}>
          <Link to={`/pages/${resultPage + 1}`}>
            <i className="material-icons">chevron_right</i>
          </Link>
        </li>
      </ul>
    );
  }

  render() {
    const { loading, items } = this.state;
    return (
      <div className="wrapper">
        <input
          id="search"
          onKeyPress={this.handleKeyPress.bind(this)}
          onChange={event => this.setState({ searchValue: event.target.value })}
          value={this.state.searchValue}
          placeholder={'Search All GIFs'}
        />
        <div className="trending-title">Top Trending Gifs</div>
        {loading && (
          <div className="loading-container">
            <div className="preloader-wrapper big active">
              <div className="spinner-layer spinner-red-only">
                <div className="circle-clipper left">
                  <div className="circle" />
                </div>
                <div className="gap-patch">
                  <div className="circle" />
                </div>
                <div className="circle-clipper right">
                  <div className="circle" />
                </div>
              </div>
            </div>
          </div>
        )}
        {!loading && (
          <div>
            <ul className="gif-container">{this.renderItems()}</ul>
            {items.length > LIMIT && this.renderPagination()}
          </div>
        )}
      </div>
    );
  }
}

export default ItemList;
