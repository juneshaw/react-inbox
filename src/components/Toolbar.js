import React from 'react'

const Toolbar = ({messages, toolbarHandler}) => {

  const whichSelected = () => {
    let whichSelected
    let selectedMessages = messages.filter((message) => {return message.selected})
    if (selectedMessages.length === messages.length) {
      whichSelected = "fa fa-check-square-o"
    } else if (selectedMessages.length === 0) {
      whichSelected = "fa fa-square-o"
    } else {
      whichSelected = "fa fa-minus-square-o"
    }
    return whichSelected
  }

  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">
            {messages.filter((message) => {return !message.read}).length}
          </span>
          unread messages
        </p>

        <a className="btn btn-danger">
          <i className="fa fa-plus"></i>
        </a>

        <button
          className="btn btn-default"
          onClick={toolbarHandler}>
          <i className={whichSelected()}>
          </i>
        </button>

        <button className="btn btn-default">Mark As Read</button>

        <button className="btn btn-default">Mark As Unread</button>

        <select className="form-control label-select">
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select">
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default">
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
  )
}

export default Toolbar
