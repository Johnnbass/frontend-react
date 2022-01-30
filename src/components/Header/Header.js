import React, { Component } from 'react';
import css from './header.module.scss';

export default class Header extends Component {
  render() {
    return (
      <header className={css.alignCenter}>
        <img src='moovin-white.png' alt='logo' />
      </header>
    );
  }
}
