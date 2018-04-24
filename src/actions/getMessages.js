export const MESSAGES_RECEIVED_SUCCESS = 'MESSAGES_RECEIVED_SUCCESS'

export const getMessages = () => {
  return async (dispatch) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`)
    // const response = await fetch('/api/messages')
    const json = await response.json()
    const messages = json.map((message) => {
      return ({...message, selected: false})
    })
    dispatch({
      type: 'MESSAGES_RECEIVED_SUCCESS',
      messages
    })
  }
}
