import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateMessage } from '../actions/updateMessage'
import { selectMessage } from '../actions/selectMessage'



const Message = ({message, updateMessage, selectMessage}) => {

  const messagesHandler = (evt) => {
    switch (evt.currentTarget.id) {
      case 'star': {
        updateMessage({
          "command": evt.currentTarget.id,
          "messageIds": [parseInt(evt.currentTarget.dataset.id,  10)],
          "star": !JSON.parse(evt.currentTarget.dataset.starred)})
        break
      }
      case 'select' : {
        selectMessage({
          "messageIds": [parseInt(evt.currentTarget.dataset.id,  10)],
          "selected": !JSON.parse(evt.currentTarget.dataset.selected)})
        break
      }
      // case 'read' : {
      //   readMessageToggle(evt.currentTarget.dataset.message)
      //   break
      // }
      default: break
    }
  }

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
              checked={message.selected}
              data-selected={message.selected} onChange={messagesHandler}/>
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
        <span
          id='read'
          data-id={message.id}
          onClick={messagesHandler}>
          {message.subject}
        </span>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  messages: state.App.messages
})

const mapDispatchToProps = dispatch => bindActionCreators({
  selectMessage,
  updateMessage
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message)
