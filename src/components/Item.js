import React, { Component } from 'react';

export class Item extends Component {
  render() {
    const { id, url, images } = this.props;
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
  }
}

export default Item;
