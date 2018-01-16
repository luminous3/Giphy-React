import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

const LIMIT = 10;
const API_KEY = 'o0WkAgsV8Yu0S7pjGI1Bk594LxB49hGF';
const RATING = 'G';
const GIPHY_BASE_URL = 'https://api.giphy.com/v1/gifs/';
// const API_KEY_STRING = `?api_key=${API_KEY}`;
// const TRENDING = 'trending?';
// const LIMIT_STR = `&limit=${LIMIT}`;
// const RATING_STR = `&rating=${G}`;

export class ItemList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
  }
  renderItems() {
    const { items } = this.state;
    return items.map(({ id, images, url }) => {
      return (
        <li key={id} className="container-item">
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

  render() {
    return (
      <div className="wrapper">
        <h4>Top 10 Trending Gifs</h4>
        <ul className="container">{this.renderItems()}</ul>
      </div>
    );
  }
}

export default ItemList;
