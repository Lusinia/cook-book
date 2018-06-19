import React, { Component } from 'react';
import './App.scss';
import Dashboard from './views/Dashboard';
import AppNavbar from './components/Navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNavbar/>
        <Dashboard/>
      </div>
    );
  }
}

export default App;
