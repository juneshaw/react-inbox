export const MESSAGES_RECEIVED_SUCCESS = 'MESSAGES_RECEIVED_SUCCESS'

export const getMessages = () => {
  return async (dispatch) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`)
    // const response = await fetch('/api/messages')
    const json = await response.json()
    dispatch({
      type: 'MESSAGES_RECEIVED_SUCCESS',
      messages: json._embedded.messages
    })
  }
}
