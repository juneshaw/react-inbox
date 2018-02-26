import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Messages from './components/Messages'
import Toolbar from './components/Toolbar'

const messages =
  [
    {text: "message1", read: true, starred: false, selected: false, labels:[{text: "label 1.1"}, {text: "label 1.2"}]},
    {text: "message2", read: false, starred: true, selected: false, labels:[{text: "label 2.1"}, {text: "label 2.2"}]},
    {text: "message3", read: false, starred: false, selected: true, labels:[{text: "label 3.1"}, {text: "label 3.2"}]}
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
