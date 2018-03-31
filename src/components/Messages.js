import React from 'react'
import Toolbar from './Toolbar'
import Message from './Message'
import ComposeForm from './ComposeForm'

const Messages = ({messages, composeOpen, handleToolBarChange, handleMessageChange, handleOpenCompose, handleCompose}) => {

  return (
    <div className="container">
      <Toolbar
        messages={messages}
        toolbarHandler={handleToolBarChange}
        openComposeHandler={handleOpenCompose}
      />
      <ComposeForm
        composeHandler={handleCompose}
        composeOpen={composeOpen}
      />
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

export default Messages
