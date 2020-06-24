import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import fire from '../config/Fire'
import { Route, Link, BrowserRouter as Router, Redirect } from 'react-router-dom'


class App extends Component {
  constructor() {
    super();
    this.state = ({
      user: null,
      
    });
    this.authListener = this.authListener.bind(this);
    this.tok = null;
  }

  componentDidMount() {
    localStorage.clear();
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.tok = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjdkNTU0ZjBjMTJjNjQ3MGZiMTg1MmY3OWRiZjY0ZjhjODQzYmIxZDciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdGFzcmZiLTcxZGE3IiwiYXVkIjoidGFzcmZiLTcxZGE3IiwiYXV0aF90aW1lIjoxNTkzMDM0OTMzLCJ1c2VyX2lkIjoicFZYYmNpOVZ2clFrZ0pHQXNFOWVwZUFHaHNwMiIsInN1YiI6InBWWGJjaTlWdnJRa2dKR0FzRTllcGVBR2hzcDIiLCJpYXQiOjE1OTMwMzU0MzMsImV4cCI6MTU5MzAzOTAzMywiZW1haWwiOiJwYWJsb25leDc3QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJwYWJsb25leDc3QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.dsyqS7bfFGclESgZLJbnQd0_liLGbZ0RWcYHMjv4aUlgk8O0BAQYOl7crAPIVRuTNwviKkFwQkG3mzMIzvVBWDbOulVflLkPY_ICdf01iCmfHBvJNbaqqMMECcQgJD_dE0J9NKuLC9ZfLGcan42S1nZLnNlnf1GzIs-uD7RSOawnDyXPpJt_UAnB2-F0gKjzRuJeFTfwh8lt9Q7Rtq0QS4nLwVD_hvqrhryRnZ5v9168JuUw8kCA1zryqhu_X0KOzViQ-9Nc5b9GJpEXwHT8jMS4u3ETetnJwhTnjKhgElDqnwyGV-JHjWPXa9eiV33Xw94Nm0hucyUmg63pFNNMfQ"
        this.setState({ user });
        localStorage.setItem('user', user.uid);
        localStorage.setItem('MmY3OWRiZjY0ZjhjO', this.tok);
        } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
        localStorage.clear();
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.user ? (         
            <Redirect to='/Home' />        
        ) :
          (
            <Login/>
          )}
      </div>
    );
  }
}

export default App;