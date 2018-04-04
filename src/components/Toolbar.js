import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Enum from 'es6-enum'
import Pluralize from 'pluralize'
import { selectMessage } from '../actions/selectMessage'

const SELECTTYPE = Enum("NONE", "SOME", "ALL")

const selectedType = (messages) => {
  let selectedType
  let selectedMessages = messages.filter((message) => {return message.selected})
  if (selectedMessages.length === 0 || messages.length === 0) {
    selectedType = SELECTTYPE.NONE }
  else if (selectedMessages.length === messages.length) {
    selectedType = SELECTTYPE.ALL
  } else {
    selectedType = SELECTTYPE.SOME
  }
  return selectedType
}

const Toolbar = ({messages, selectMessage, openComposeHandler}) => {

  const labels = [
    {text: 'dev'}, {text: 'personal'}, {text: 'gschool'}
  ]

  const selectedStyle = () => {
    let selectedStyle
    switch (selectedType(messages)) {
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

  const toolbarHandler = (request) => {
    let updatedMessages
    let updateState = true
    let selectedMessageIds = messages.filter((message) => message.selected).map((message) => message.id)
    const command = request.currentTarget.id
    switch (command) {
      case "select_messages": {
        const selected =
        selectedType(messages) === SELECTTYPE.NONE ||
        selectedType(messages) === SELECTTYPE.SOME
        const messageIds = messages.map((message) => {
          return message.id
        })
        selectMessage({messageIds, selected})
        break
      }
      case "mark_as_read": {
        updatedMessages = this.state.messages.map((message) =>
           message.selected  ? {...message, read: true} : message)
        this.updateMessage(
          {command: "read",
          messageIds: selectedMessageIds,
          "read": true}
        )
        break
      }
      case "mark_as_unread": {
        updatedMessages = this.state.messages.map((message) =>
           message.selected  ? {...message, read: false} : message)
        this.updateMessage(
          {command: "read",
          messageIds: selectedMessageIds,
          "read": false}
        )
        break
      }
      case "apply_label": {
        let newLabel = request.currentTarget.value
        updatedMessages = this.state.messages.map((message) => {
          if (message.selected && message.labels.findIndex((label) => (label === newLabel)) < 0) {
            message.labels.push(newLabel)
          }
          return {...message, labels: message.labels}
        })
        this.updateMessage(
          {command: "addLabel",
          messageIds: selectedMessageIds,
          "label": newLabel}
        )
        break
      }
      case "remove_label": {
        let newLabel = request.currentTarget.value
        updatedMessages = this.state.messages.map((message) => {
          if (message.selected) {
            let index = message.labels.findIndex((label) => (label === newLabel))
            if (index >= 0) {
              message.labels.splice(index, 1)
            }
          }
          return {...message, labels: message.labels}
        })
        this.updateMessage(
          {command: "removeLabel",
          messageIds: selectedMessageIds,
          "label": newLabel}
        )
        break
      }
      case "delete": {
        updatedMessages = this.state.messages.filter((message) => {
          return (!message.selected)
        })
        this.updateMessage(
          {command: "delete",
          messageIds: selectedMessageIds}
        )
        break
      }
    }
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
            {messages.filter((message) => {return !message.read}).length}  {Pluralize('unread message', messages.filter((message) => {return !message.read}).length)}
          </span>
        </p>

        <a className="btn btn-danger"
          id="compose_message"
          onClick={openComposeHandler}>
          <i className="fa fa-plus"></i>
        </a>

        <button
          className="btn btn-default"
          disabled={messages.length === 0}
          id="select_messages"
          onClick={toolbarHandler}>
          <i className={selectedStyle()}> </i>
        </button>

        <button
          className="btn btn-default"
          id="mark_as_read"
          disabled={selectedType(messages) === SELECTTYPE.NONE}
          onClick={toolbarHandler}
          >Mark As Read
        </button>

        <button
          className="btn btn-default"
          id="mark_as_unread"
          disabled={selectedType(messages) === SELECTTYPE.NONE}
          onClick={toolbarHandler}
          >Mark As Unread</button>

        <select
          className="form-control label-select"
          id="apply_label"
          disabled={selectedType(messages) === SELECTTYPE.NONE}
          onChange={handleAddLabel}>
          <option disabled="disabled" selected="selected">Apply label</option>
          {labels.map((label,i) =>
            <option key={i} value={label.text}>
              {label.text}
            </option>
          )}
        </select>

        <select
          className="form-control label-select"
          id="remove_label"
          disabled={selectedType(messages) === SELECTTYPE.NONE}
          onChange={handleRemoveLabel}>
          <option disabled="disabled" selected="selected">Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button
          className="btn btn-default"
          id="delete"
          disabled={selectedType(messages) === SELECTTYPE.NONE}
          onClick={toolbarHandler} >
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
  )
}

export { selectedType }
export { SELECTTYPE }

const mapStateToProps = state => ({
  messages: state.App.messages
})

const mapDispatchToProps = dispatch => bindActionCreators({
  selectMessage
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar)
