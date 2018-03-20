import React from 'react'
import Toolbar from './Toolbar'
import { SELECTTYPE } from './Toolbar'
import { selectedType } from './Toolbar'
import Message from './Message'
import ComposeForm from './ComposeForm'

class Messages extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: props.messages,
      composeOpen: props.composeOpen};
  }

  async componentDidMount() {
    // const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`)
    const response = await fetch('/api/messages')
    const json = await response.json()
    this.setState(...this.state, {messages: json._embedded.messages})
  }

  findMessage = (id) => this.state.messages.findIndex((message) => (message.id === parseInt(id, 10)))


  async patchMessage (requestBody) {
    const response = await fetch('/api/messages', {
        method: 'PATCH',
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json'
        }})
    console.log('response: ', response)
  }

  async postMessage (requestBody) {
    const response = await fetch('/api/messages', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json'
        }})
    console.log('response: ', response)
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
          this.patchMessage({command,  "messageIds": [message.id], "star": message.starred})
          break
        }
        case 'select': {
          message.selected = !message.selected
          break
        }
        case 'read': {
          if (!message.read) {
            message.read = true
            this.patchMessage({command,  "messageIds": [message.id], "read": message.read})
          }
          break
        }
        default: break
      }
      this.setState({...this.state, messages:updatedMessages})
    }
  }

  selectedMessageIds = (messages) => messages.filter = (message) => message.selected

  handleOpenCompose = () => {
    this.setState({...this.state, "composeOpen": !this.state.composeOpen})
  }

  buildRequest = (target) => ({body: {subject: target.subject.value, body: target.body.value}})

  resetForm = () => {
    document.getElementById('subject').value=""
    document.getElementById('body').value=""
  }

  handleCompose = (event) => {
    alert('in handleCompose')
    event.preventDefault()
    const request = this.buildRequest(event.target)
    this.postMessage(request)
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
        this.patchMessage({command: "read",  messageIds, "read": true})
        break
      }
      case "mark_as_unread": {
        updatedMessages = this.state.messages.map((message) =>
           message.selected  ? {...message, read: false} : message)
        this.patchMessage({command: "read",  messageIds, "read": false})
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
        this.patchMessage({command: "addLabel", messageIds, "label": newLabel})
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
        this.patchMessage({command: "removeLabel", messageIds, "label": newLabel})
        break
      }
      case "delete": {
        updatedMessages = this.state.messages.filter((message) => {
          return (!message.selected)
        })
        this.patchMessage({command: "delete", messageIds})
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
      <div className="container">
        <Toolbar
          messages={this.state.messages}
          toolbarHandler={this.handleToolbarChange}
          openComposeHandler={this.handleOpenCompose}
        />
        <ComposeForm
          composeHandler={this.handleCompose}
          composeOpen={this.state.composeOpen}
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
