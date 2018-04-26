import { MESSAGES_RECEIVED_SUCCESS } from '../actions/getMessages'
import { MESSAGE_ADDED_SUCCESS } from '../actions/addMessage'
import { COMPOSE_OPEN } from '../actions/composeMessage'
import { COMPOSE_CLOSE } from '../actions/composeMessage'
import { UPDATE_MESSAGE_SUCCESS } from '../actions/updateMessage'
import { SELECT_MESSAGE_SUCCESS } from '../actions/selectMessage'

const initialState = {
  messages: [],
  isComposeOpen: false
}

export default (state = initialState, action) => {

  let messageIndex, messages, updatedMessages, selectedMessages, messageLabels

  switch (action.type) {
    case MESSAGES_RECEIVED_SUCCESS:
      return {...state, messages: action.messages}
    case MESSAGE_ADDED_SUCCESS:
      return {...state, messages: [...state.messages, action.message]}
    case SELECT_MESSAGE_SUCCESS: {
      selectedMessages = state.messages.filter((message) =>
        {return (action.message.messageIds.indexOf(message.id) !== -1)})
      messages = selectedMessages.map((message) => {
        return {...message, selected: action.message.selected}
      })
      updatedMessages = state.messages.map((stateMessage) =>  {
        messageIndex = messages.findIndex((message) => {
          return stateMessage.id === message.id
        })
        if (messageIndex >= 0) {
          return messages[messageIndex]
        } else {
          return stateMessage
        }
      })
      return {
        ...state,
        messages: [...updatedMessages]
      }
    }
    case UPDATE_MESSAGE_SUCCESS: {
      switch (action.message.command) {
        case "star": {
          messages = state.messages.map((message) => {
            return {...message, "starred": action.message.star}
          })
          break
        }
        case "addLabel": {
          messages = state.messages.map((message) => {
            if (action.message.messageIds.indexOf(message.id) !== -1) {
              const newLabels = [...message.labels, action.message.label]
              messageLabels = Array.from(new Set(newLabels))
              return {...message, labels: messageLabels}
            } else {
              return message
            }
          })
          break
        }
        case "removeLabel": {
          messages = state.messages.map((message) => {
            if (action.message.messageIds.indexOf(message.id) !== -1) {
              const messageLabels = message.labels.filter(messageLabel => messageLabel != action.message.label)
              return ({...message, labels: messageLabels})
            } else {
              return message
            }
          })
          break
        }
        case "read": {
          messages = state.messages.map((message) => {
            if (action.message.messageIds.indexOf(message.id) !== -1) {
              return {...message, "read": action.message.read}
            } else {
              return message
            }
          })
          break
        }
        case "delete": {
          messages = state.messages.filter((message) =>
            {return (action.message.messageIds.indexOf(message.id) === -1)})
          break
        }
        default: break
      }

      return {
        ...state,
        messages
      }
    }

    case COMPOSE_OPEN: {
      return {
        ...state,
        isComposeOpen: true
      }
    }

    case COMPOSE_CLOSE: {
      return {
        ...state,
        isComposeOpen: false
      }
    }

    default:
      return state
  }
}
