import React from 'react'
import Toolbar from './Toolbar'
import { SELECTTYPE } from './Toolbar'
import { selectedType } from './Toolbar'
import Message from './Message'

class Messages extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: props.messages};
  }

  async componentDidMount() {
    // const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`)
    const response = await fetch('/api/messages')
    const json = await response.json()
    this.setState(...this.state, {messages: json._embedded.messages})
  }

  findMessage = (id) => this.state.messages.findIndex((message) => (message.id === parseInt(id, 10)))

  async postMessage (messageId, postObject) {
    const response = await fetch('/api/messages', {
        method: 'PATCH',
        body: JSON.stringify(postObject),
        headers: {
            'Content-Type': 'application/json'
        }})
    const json = await response
  }

  handleMessageChange = (request) => {
    let updatedMessages = [...this.state.messages]
    let messageIndex = this.findMessage(request.currentTarget.dataset.id)
    if (messageIndex > -1) {
      let message = updatedMessages[messageIndex]
      let command = request.currentTarget.id
      switch (request.currentTarget.id) {
        case 'star': {
          message.starred = !message.starred
          this.postMessage(message.id, {command,  "messageIds": [message.id], "star": message.starred})
          break
        }
        case 'select': {
          message.selected = !message.selected
          break
        }
        case 'read': {
          if (!message.read) {
            message.read = true
            this.postMessage(message.id, {command,  "messageIds": [message.id], "read": message.read})
          }
          break
        }
        default: break
      }
      this.setState({...this.state, messages:updatedMessages})
    }
  }

  handleToolbarChange = (request) => {
    let updatedMessages
    switch (request.currentTarget.id) {
      case "select_messages": {
        updatedMessages = this.state.messages.map((message) =>
          (selectedType(this.state.messages) === SELECTTYPE.NONE ||
          selectedType(this.state.messages) === SELECTTYPE.SOME) ?
          {...message, selected: true} :
          {...message, selected: false})
        this.setState({...this.state, messages: updatedMessages})
        break
      }
      case "mark_as_read": {
        updatedMessages = this.state.messages.map((message) =>
           message.selected  ? {...message, read: true} : message)
        this.setState({...this.state, messages: updatedMessages})
        break
      }
      case "mark_as_unread": {
        updatedMessages = this.state.messages.map((message) =>
           message.selected  ? {...message, read: false} : message)
        this.setState({...this.state, messages: updatedMessages})
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
        this.setState({...this.state, messages: updatedMessages})
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
        this.setState({...this.state, messages: updatedMessages})
        break
      }
      case "delete": {
        updatedMessages = this.state.messages.filter((message) => {
          return (!message.selected)
        })
        this.setState({...this.state, messages: updatedMessages})
        break
      }
      default: {
        // updatedMessages = this.state.messages
        break
      }
    }
    // this.setState({...this.state, messages: updatedMessages})
  }

  render() {
    return (
      <div className="container">
        <Toolbar
          messages={this.state.messages}
          toolbarHandler={this.handleToolbarChange}
        />
        {this.state.messages.map((message, i) => {
          return (
            <Message
              key={i}
              message={message}
              messagesHandler={this.handleMessageChange}/>
          )
        })}
      </div>
    )
  }
}

export default Messages
