import React, { Component } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

export class Pagination extends Component {
  render() {
    const { items, resultPage, query } = this.props;
    const pages = Math.ceil(items.length / 10);

    const links = _.range(1, pages + 1).map(page => {
      console.log(page);
      return (
        <li
          key={'page' + page}
          className={page === resultPage ? 'active' : 'waves-effect'}
        >
          <Link to={`/pages/${page}/${query}`}>{page}</Link>
        </li>
      );
    });

    const linkId = parseInt(resultPage);

    return (
      <ul className="pagination">
        <li className={resultPage === 1 ? 'disabled' : ''}>
          <Link to={resultPage > 1 ? `/pages/${linkId - 1}/${query}` : null}>
            <i className="material-icons">chevron_left</i>
          </Link>
        </li>
        {links}
        <li className={resultPage === pages + 1 ? 'disabled' : ''}>
          <Link to={resultPage < 10 ? `/pages/${linkId + 1}/${query}` : null}>
            <i className="material-icons">chevron_right</i>
          </Link>
        </li>
      </ul>
    );
  }
}

export default Pagination;
