import React, { Component } from 'react';
import css from './footer.module.scss';

export default class Footer extends Component {
  render() {
    return (
      <footer className={css.footer}>
        <small className={[css.alignCenter, "pt-2"].join(' ')}>
          Moovin {new Date().getFullYear()} - Todos os direitos reservados.
        </small>
      </footer>
    );
  }
}
