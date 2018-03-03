import React from 'react'
import Enum from "es6-enum"

const Toolbar = ({messages, toolbarHandler}) => {

  const SELECTTYPE = Enum("NONE", "SOME", "ALL")

  const labels = [
    {text: 'dev'}, {text: 'personal'}, {text: 'gschool'}
  ]

  const selectedType = () => {
    let selectedType
    let selectedMessages = messages.filter((message) => {return message.selected})
    if (selectedMessages.length === messages.length) {
      selectedType = SELECTTYPE.NONE
    } else if (selectedMessages.length === 0) {
      selectedType = SELECTTYPE.ALL
    } else {
      selectedType = SELECTTYPE.SOME
    }
    return selectedType
  }

  const selectedStyle = () => {
    let selectedStyle
    switch (selectedType()) {
      case SELECTTYPE.ALL: {
        selectedStyle = "fa fa-check-square-o"
        break
      }
      case SELECTTYPE.NONE: {
        selectedStyle = "fa fa-square-o"
        break
      }
      case SELECTTYPE.SOME: {
        selectedStyle = "fa fa-minus-square-o"
        break
      }
      default: break
    }
    return selectedStyle
  }

  const handleAddLabel = (evt) => {
    toolbarHandler(evt)
    document.getElementById('apply_label').selectedIndex=0
  }

  const handleRemoveLabel = (evt) => {
    toolbarHandler(evt)
    document.getElementById('remove_label').selectedIndex=0
  }
  return (
    <div className="row toolbar">
      <div
        className="col-md-12">
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
          className="btn btn-default">
          <i className={selectedStyle()}>
          </i>
        </button>

        <button
          className="btn btn-default"
          id="mark_as_read"
          onClick={toolbarHandler}
          >Mark As Read
        </button>

        <button
          className="btn btn-default"
          id="mark_as_unread"
          onClick={toolbarHandler}
          >Mark As Unread</button>

        <select
          className="form-control label-select"
          id="apply_label"
          onChange={handleAddLabel}>
          <option disabled="disabled" selected="selected">Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select
          className="form-control label-select"
          id="remove_label"
          onChange={handleRemoveLabel}>
          <option disabled="disabled" selected="selected">Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default">
          <i
            className="fa fa-trash-o"
            id="delete"
            onClick={toolbarHandler}></i>
        </button>
      </div>
    </div>
  )
}

export default Toolbar
