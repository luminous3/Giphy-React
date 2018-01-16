import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

const LIMIT = 10;
const API_KEY = 'o0WkAgsV8Yu0S7pjGI1Bk594LxB49hGF';
const RATING = 'G';
const GIPHY_BASE_URL = 'https://api.giphy.com/v1/gifs/';

export class ItemList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      searchValue: '',
      loading: false
    };
  }

  componentDidMount() {
    axios
      .get(
        'https://api.giphy.com/v1/gifs/trending?api_key=o0WkAgsV8Yu0S7pjGI1Bk594LxB49hGF&limit=10&rating=G'
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
        `https://api.giphy.com/v1/gifs/search?api_key=o0WkAgsV8Yu0S7pjGI1Bk594LxB49hGF&q=${searchInput}&limit=100&offset=0&rating=G&lang=en`
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
    const { items } = this.state;
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

  render() {
    const { loading } = this.state;
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
        {!loading && (
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
        {loading && <ul className="gif-container">{this.renderItems()}</ul>}
      </div>
    );
  }
}

export default ItemList;
