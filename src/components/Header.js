import React, { Component } from 'react';
import { Link } from 'react-router';

export class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">
            Giphly
          </Link>
        </div>
      </nav>
    );
  }
}

export default Header;
