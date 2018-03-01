import React from 'react'
import Toolbar from './Toolbar'
import Message from './Message'

class Messages extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: props.messages,
      allSelected: false
    }
  }

  findMessage = (id) => this.state.messages.findIndex((message) => (message.id === parseInt(id, 10)))

  handleMessageChange = (request) => {
    let updatedMessages = [...this.state.messages]
    let messageIndex = this.findMessage(request.target.dataset.id)
    if (messageIndex > -1) {
      let message = updatedMessages[messageIndex]
      switch (request.target.id) {
        case 'star': {
          message.starred = !message.starred
          break
        }
        case 'select': {
          message.selected = !message.selected
          break
        }
        case 'read': {
          message.read = true
          break
        }
        default: break
      }
      this.setState({...this.state, messages:updatedMessages})
    }
    // } else {
    //   updatedMessages.push(message)
    // }
  }

  handleToolbarChange = (request) => {
    let messages = this.state.messages
    switch (request.target.id) {
      case "mark_as_read": {
        messages = this.state.messages.map((message) =>
           message.selected  ? {...message, read: true} : message)
        break
      }
      case "mark_as_unread": {
        messages = this.state.messages.map((message) =>
           message.selected  ? {...message, read: false} : message)
        break
      }
      case "apply_label": {
        let newLabel = request.target.value
        let messages = this.state.messages.map((message) =>
           message.selected && (message.labels.findIndex((label) => (label.text === newLabel)) < 0) ?
           {...message, labels: message.labels.push({text:newLabel})} :
           message)
        break
      }
      default: {
        break
      }
    }
    this.setState({...this.state, messages})
  }

  render() {
    return (
      <div className="container">
        <Toolbar
          messages={this.state.messages}
          allSelected={this.state.allSelected}
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
