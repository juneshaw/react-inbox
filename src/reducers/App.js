import { MESSAGES_RECEIVED_SUCCESS } from '../actions/getMessages'
import { MESSAGE_ADDED_SUCCESS } from '../actions/addMessage'
import { UPDATE_MESSAGE_SUCCESS } from '../actions/updateMessage'
import { SELECT_MESSAGE_SUCCESS } from '../actions/selectMessage'

const initialState = {
  messages: [],
  composeOpen: false
}

export default (state = initialState, action) => {
  let messageIndex
  switch (action.type) {
    case MESSAGES_RECEIVED_SUCCESS:
      return {...state, messages: action.messages}
    case MESSAGE_ADDED_SUCCESS:
      return {...state, messages: [...state.messages, action.messages]}
    case SELECT_MESSAGE_SUCCESS:
      const selectedMessages = state.messages.filter((message) =>
        {return (action.message.messageIds.indexOf(message.id) !== -1)})      
    case UPDATE_MESSAGE_SUCCESS: {
      const selectedMessages = state.messages.filter((message) => {
        return (action.message.messageIds.indexOf(message.id) !== -1)})
      let messages
      switch (action.message.command) {
        case "star": {
          messages = selectedMessages.map((message) => {
            return {...message, "starred": action.message.star}
          })
          break
        }
        case "apply_label": {
          messages = selectedMessages.map((message) => {
            const newLabels = [...message.labels, action.message.label]
            message.labels = Array.from(new Set(newLabels))
            return message
          })
          break
        }
        case "remove_label": {
          messages = selectedMessages.map((message) => {
            const index = message.labels.findIndex((label) => (label === action.message.label))
            if (index >= 0) {
              message.labels.splice(index, 1)
            }
            return message
          })
          break
        }
        case "mark_as_read":
        case "mark_as_unread": {
          messages = selectedMessages.map((message) => {
            return {...message, "read": action.message.read}
          })
          break
        }
        default: break
      }
      const updatedMessages = state.messages.map((stateMessage) =>  {
        messageIndex = messages.findIndex((message) => {
          return stateMessage.id === message.id
        })
        if (messageIndex >= 0) {
          return messages[messageIndex]
        } else {
          return stateMessage
        }})
      return {
        ...state,
        messages: [...updatedMessages]
      }
    }
    default:
      return state
  }
}
