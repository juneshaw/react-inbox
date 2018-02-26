import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Messages from './components/Messages'
import Toolbar from './components/Toolbar'

const messages =
  [
    {text: "message1", read: true, starred: false, selected: false},
    {text: "message2", read: false, starred: false, selected: false}
  ]

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Toolbar />
        <Messages messages={messages}/>
      </div>
    );
  }
}

export default App;
