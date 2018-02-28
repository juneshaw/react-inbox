import React from 'react'
import Toolbar from './Toolbar'
import Message from './Message'

class Messages extends React.Component {

  constructor(props) {
    super(props)
    this.state = {messages: props.messages}
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
    alert('made it to toolbar change handler')
    
  }

  render() {
    return (
      <div className="container">
        <Toolbar
          messages={this.state.messages}
          toolbarHandler={this.handleToolbarChange}/>
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
