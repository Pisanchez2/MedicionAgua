import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import Login from './Login';
import fire from '../config/Fire'

class App extends Component {
  constructor() {
    super();
    this.state = ({
      user: null,
    });
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.user ? (
          
          <Home />
          
        ) :
          (
            <Login />
          )}
      </div>
    );
  }
}

export default App;