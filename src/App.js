import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Messages from './components/Messages'

const messages =
  [
    {id: 1, text: "message1", read: true, starred: false, selected: false, labels:[{text: "dev"}, {text: "personal"}]},
    {id: 2, text: "message2", read: false, starred: true, selected: false, labels:[{text: "personal"}, {text: "gschool"}]},
    {id: 3, text: "message3", read: false, starred: false, selected: true, labels:[{text: "dev"}, {text: "gschool"}]}
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
        <Messages messages={messages}/>
      </div>
    );
  }
}

export default App;
