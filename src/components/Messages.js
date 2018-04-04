import React from 'react'
import { connect } from 'react-redux'
import Message from './Message'

const Messages = ({messages}) => {

  return (
    <div className="container">
      {messages.map((message, i) => {
        return (
          <Message
            key={i}
            message={message}/>
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
