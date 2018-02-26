import React from 'react'
import ReactDOM from 'react-dom';

const Message = ({message}) => {
  return (
    <div className={`row message
                    ${message.read ? 'read' : 'unread'}
                    ${message.selected ? 'selected' : 'unselected'}`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked={message.selected}/>
          </div>
          <div className="col-xs-2">
            <i className={`star fa ${message.starred ? 'fa-star' : 'fa-star-o'}`}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        <a href="#">
          {message.text}
        </a>
      </div>
    </div>
  )
}

export default Message
