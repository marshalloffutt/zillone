import React, { Component } from 'react';

import connection from '../helpers/data/connection';

import Auth from '../components/Auth/Auth';
import Listings from '../components/Listings/Listings';
import Mavbar from '../components/Mavbar/Mavbar';

import './App.scss';
import authRequests from '../helpers/data/authRequests';

class App extends Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    connection();
  }

  isAuthenticated = () => {
    this.setState({ authed: true });
  }

  render() {
    const logoutClicky = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };
    if (!this.state.authed) {
      return (
        <div className="App">
          <Mavbar isAuthed={this.state.authed} logoutClicky={logoutClicky}/>
          <Auth isAuthenticated={this.isAuthenticated}/>
        </div>
      );
    }
    return (
      <div className="App">
        <Mavbar isAuthed={this.state.authed} logoutClicky={logoutClicky}/>
        <Listings />
      </div>
    );
  }
}

export default App;
