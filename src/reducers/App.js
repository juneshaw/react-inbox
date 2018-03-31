import { MESSAGES_RECEIVED_SUCCESS } from '../actions/getMessages'

const initialState = {
  messages: [],
  labels: [],
  composeOpen: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case MESSAGES_RECEIVED_SUCCESS:
      return {...state, messages: action.messages}
    default:
      return state
  }
}
