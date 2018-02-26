import React from 'react'
import ReactDOM from 'react-dom'
import Message from './Message'

class Messages extends React.Component {

  constructor(props) {
    super(props)
    this.state = {messages: props.messages}
  }

  render() {
    return (
      <div className="container">
        {this.state.messages.map((message, i) => {
          return (
            <Message key={i}
              message={message} />
          )
        })}
      </div>
    )
  }
}

export default Messages
