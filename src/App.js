import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Messages from './components/Messages'

// const messages =
//   [
//     {id: 1, text: "message1", read: true, starred: false, selected: false, labels:[{text: "dev"}, {text: "personal"}]},
//     {id: 2, text: "message2", read: false, starred: true, selected: false, labels:[{text: "personal"}, {text: "gschool"}]},
//     {id: 3, text: "message3", read: false, starred: false, selected: true, labels:[{text: "dev"}, {text: "gschool"}]}
//   ]

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Inbox</h1>
        </header>
        <Messages messages={[]}/>
      </div>
    );
  }
}

export default App;
