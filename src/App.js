import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './App.css';
import Messages from './components/Messages'
import ComposeForm from './components/ComposeForm'
import Toolbar from './components/Toolbar'
import { SELECTTYPE } from './components/Toolbar'
import { selectedType } from './components/Toolbar'
import { getMessages } from './actions/getMessages'
import { addMessage } from './actions/addMessage'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      composeOpen: false};
  }

  async componentDidMount() {
    this.props.getMessages();
  }

  findMessage = (id) => this.state.messages.findIndex((message) => (message.id === parseInt(id, 10)))

  async updateMessage (requestBody) {
    // const response = await fetch('/api/messages', {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
        method: 'PATCH',
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json'
        }})
  }

  selectedMessageIds = (messages) => messages.filter = (message) => message.selected

  handleOpenCompose = () => {
    this.setState({...this.state, "composeOpen": !this.state.composeOpen})
  }

  buildRequest = (target) => ({subject: target.subject.value, body: target.body.value})

  resetComposeForm = () => {
    document.getElementById('subject').value=""
    document.getElementById('body').value=""
  }

  handleCompose = (event) => {
    event.preventDefault()
    const request = this.buildRequest(event.target)
    this.props.addMessage(request)
    this.resetComposeForm()
    this.setState({...this.state, "composeOpen": false})
  }

  handleToolbarChange = (request) => {
    let updatedMessages
    let updateState = true
    let messageIds = this.state.messages.filter((message) => message.selected).map((message) => message.id)
    const command = request.currentTarget.id
    switch (command) {
      case "select_messages": {
        updatedMessages = this.state.messages.map((message) =>
          (selectedType(this.state.messages) === SELECTTYPE.NONE ||
          selectedType(this.state.messages) === SELECTTYPE.SOME) ?
          {...message, selected: true} :
          {...message, selected: false})
        break
      }
      case "mark_as_read": {
        updatedMessages = this.state.messages.map((message) =>
           message.selected  ? {...message, read: true} : message)
        this.updateMessage({command: "read",  messageIds, "read": true})
        break
      }
      case "mark_as_unread": {
        updatedMessages = this.state.messages.map((message) =>
           message.selected  ? {...message, read: false} : message)
        this.updateMessage({command: "read",  messageIds, "read": false})
        break
      }
      case "apply_label": {
        let newLabel = request.currentTarget.value
        updatedMessages = this.state.messages.map((message) => {
          if (message.selected && message.labels.findIndex((label) => (label === newLabel)) < 0) {
            message.labels.push(newLabel)
          }
          return {...message, labels: message.labels}
        })
        this.updateMessage({command: "addLabel", messageIds, "label": newLabel})
        break
      }
      case "remove_label": {
        let newLabel = request.currentTarget.value
        updatedMessages = this.state.messages.map((message) => {
          if (message.selected) {
            let index = message.labels.findIndex((label) => (label === newLabel))
            if (index >= 0) {
              message.labels.splice(index, 1)
            }
          }
          return {...message, labels: message.labels}
        })
        this.updateMessage({command: "removeLabel", messageIds, "label": newLabel})
        break
      }
      case "delete": {
        updatedMessages = this.state.messages.filter((message) => {
          return (!message.selected)
        })
        this.updateMessage({command: "delete", messageIds})
        break
      }
      default: {
        updateState = false
        break
      }
    }
    if (updateState) {
      this.setState({...this.state, messages: updatedMessages})
    }

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Inbox</h1>
        </header>
        <Toolbar
          openComposeHandler={this.handleOpenCompose.bind(this)}
          toolbarHandler={this.handleToolbarChange.bind(this)}
        />
        <ComposeForm
          composeHandler={this.handleCompose.bind(this)}
          composeOpen={this.state.composeOpen}
        />
        <Messages />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.messages
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addMessage,
  getMessages
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
