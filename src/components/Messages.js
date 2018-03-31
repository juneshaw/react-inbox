import React from 'react'
import Toolbar from './Toolbar'
import Message from './Message'
import ComposeForm from './ComposeForm'

const Messages = ({messages, composeOpen, handleToolBarChange, handleMessageChange, handleOpenCompose, handleCompose}) => {

  return (
    <div className="container">
      {messages.map((message, i) => {
        return (
          <Message
            key={i}
            message={message}
            messagesHandler={handleMessageChange}/>
        )
      })}
    </div>
  )
}

const mapStateToProps = state => {
  state: {
    messages: state.messages
    labels: state.labels
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages)
