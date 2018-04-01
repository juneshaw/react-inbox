import React from 'react'
import { connect } from 'react-redux'
import Toolbar from './Toolbar'
import Message from './Message'
import ComposeForm from './ComposeForm'

const Messages = ({messages, handleMessageChange}) => {

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

const mapStateToProps = state => ({
  messages: state.App.messages
})

export default connect(
  mapStateToProps
)(Messages)
