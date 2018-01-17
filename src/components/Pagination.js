import React, { Component } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

export class Pagination extends Component {
  render() {
    const { items, resultPage, searchValue } = this.props;
    const pages = Math.ceil(items.length / 10);

    const links = _.range(1, pages + 1).map(page => {
      return (
        <li
          key={'page' + page}
          className={page === resultPage ? 'active' : 'waves-effect'}
        >
          <Link to={`/pages/${page}/${searchValue}`}>{page}</Link>
        </li>
      );
    });

    return (
      <ul className="pagination">
        <li className={resultPage === 1 ? 'disabled' : ''}>
          <Link to={`/pages/${resultPage - 1}/${searchValue}`}>
            <i className="material-icons">chevron_left</i>
          </Link>
        </li>
        {links}
        <li className={resultPage === pages + 1 ? 'disabled' : ''}>
          <Link to={`/pages/${resultPage + 1}/${searchValue}`}>
            <i className="material-icons">chevron_right</i>
          </Link>
        </li>
      </ul>
    );
  }
}

export default Pagination;
