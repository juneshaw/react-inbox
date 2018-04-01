import { MESSAGES_RECEIVED_SUCCESS } from '../actions/getMessages'
import { MESSAGE_ADDED_SUCCESS } from '../actions/addMessage'

const initialState = {
  messages: [],
  composeOpen: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case MESSAGES_RECEIVED_SUCCESS:
      return {...state, messages: action.messages}
    case MESSAGE_ADDED_SUCCESS:
      return {...state, messages: [...state.messages, action.message]}
    default:
      return state
  }
}
