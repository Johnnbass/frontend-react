import React, { Component, Fragment } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Home />
        <Footer />
      </Fragment>
    );
  };
}
