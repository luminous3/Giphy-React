import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect, bindActionCreators } from 'react-redux';
import { fetchTrending } from '../redux/actions';

export class Header extends Component {
  handleClick() {
    const { fetchTrending } = this.props;
    fetchTrending();
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a
            href="/"
            onClick={this.handleClick.bind(this)}
            className="brand-logo left"
          >
            Giphly
          </a>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    query: state.query
  };
}

const mapDispatchToProps = {
  fetchTrending
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
