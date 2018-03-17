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

  constructor(props) {
    super(props);
    this.state = {
      messages: []};
  }

  async componentDidMount() {
    // const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`)
    const response = await fetch('/api/messages')
    const json = await response.json()
    const messagesResponse = await fetch(json.links.messages.href)
    const messages = await messagesResponse.json()
    this.setState({...this.state, messages})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Inbox</h1>
        </header>
        <Messages messages={this.state.messages}/>
      </div>
    );
  }
}

export default App;
