import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/auth';

import connection from '../helpers/data/connection';

import Auth from '../components/Auth/Auth';
import Listings from '../components/Listings/Listings';
import Building from '../components/Building/Building';
import ListingsForm from '../components/ListingsForm/ListingsForm';
import Mavbar from '../components/Mavbar/Mavbar';

import './App.scss';
import authRequests from '../helpers/data/authRequests';

class App extends Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
        });
      } else {
        this.setState({
          authed: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
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
          <div className="row">
            <Auth isAuthenticated={this.isAuthenticated}/>
          </div>
        </div>
      );
    }
    return (
      <div className="App">
        <Mavbar isAuthed={this.state.authed} logoutClicky={logoutClicky}/>
        <div className="row">
          <Listings />
          <Building />
        </div>
        <div className="row">
          <ListingsForm />
        </div>
      </div>
    );
  }
}

export default App;
