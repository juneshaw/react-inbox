import React from 'react'

const Message = ({message, messagesHandler}) => {

  return (
    <div className={`row message
                    ${message.read ? "read" : "unread"}
                    ${message.selected ? 'selected' : 'unselected'}`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" id='select' data-id={message.id} checked={message.selected} onChange={messagesHandler}/>
          </div>
          <div className="col-xs-2">
            <i id='star' data-id={message.id} className={`star fa ${message.starred ? 'fa-star' : 'fa-star-o'}`} onClick={messagesHandler}></i>
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

export default Message
