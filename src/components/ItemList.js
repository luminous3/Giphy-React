import React, { Component } from 'react';
import { Link } from 'react-router';

export class ItemList extends Component {
  renderItems() {
    return this.props.data.items.map(({ id, name }) => {
      return (
        <li key={id} className="collection-item">
          <Link to={`/items/${id}`}>{name}</Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="wrapper">
        <h4>Items</h4>
        <ul className="collection">Items</ul>
      </div>
    );
  }
}

export default ItemList;
