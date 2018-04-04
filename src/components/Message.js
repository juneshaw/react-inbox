import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateMessage } from '../actions/updateMessage'
import { selectMessage } from '../actions/selectMessage'



const Message = ({message, updateMessage}) => {

  const messagesHandler = (evt) => {
    switch (evt.currentTarget.id) {
      case 'star': {
        updateMessage({
          "command": evt.currentTarget.id,
          "messageIds": [parseInt(evt.currentTarget.dataset.id,  10)],
          "star": !(JSON.parse(evt.currentTarget.dataset.starred))})
        break
      }
      case 'select' : {
        selectMessage({
          "messageIds": [parseInt(evt.currentTarget.dataset.id,  10)],
          "selected": evt.currentTarget.dataset.selected})
        break
      }
      // case 'read' : {
      //   readMessageToggle(evt.currentTarget.dataset.message)
      //   break
      // }
      default: break
    }
  }

    //
    // handleMessageChange = (request) => {
    //   let updatedMessages = [...this.state.messages]
    //   let messageIndex = this.findMessage(request.currentTarget.dataset.id)
    //   if (messageIndex > -1) {
    //     let message = updatedMessages[messageIndex]
    //     let command = request.currentTarget.id
    //     switch (request.currentTarget.id) {
    //       case 'star': {
    //         message.starred = !message.starred
    //         this.updateMessage({command,  "messageIds": [message.id], "star": message.starred})
    //         break
    //       }
    //       case 'select': {
    //         message.selected = !message.selected
    //         break
    //       }
    //       case 'read': {
    //         if (!message.read) {
    //           message.read = true
    //           this.updateMessage({command,  "messageIds": [message.id], "read": message.read})
    //         }
    //         break
    //       }
    //       default: break
    //     }
    //     this.setState({...this.state, messages:updatedMessages})
    //   }
    // }
  return (
    <div className={`row message
                    ${message.read ? "read" : "unread"}
                    ${message.selected ? 'selected' : 'unselected'}`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input
              type="checkbox"
              id='select'
              data-id={message.id}
              checked={message.selected} onChange={messagesHandler}/>
          </div>
          <div className="col-xs-2">
            <i
              id='star'
              data-id={message.id}
              data-starred={message.starred}
              className={`star fa ${message.starred ? 'fa-star' : 'fa-star-o'}`} onClick={messagesHandler.bind(this)}>
            </i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        {message.labels.map((label, i) => {
          return (
            <span
              key={i}
              className="label label-warning"
              data-label={label}>
              {label}
            </span>
          )
        })}
        <span id='read' data-id={message.id} onClick={messagesHandler}>
          {message.subject}
        </span>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => bindActionCreators({
  updateMessage
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(Message)
