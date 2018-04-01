export const MESSAGE_ADDED_SUCCESS = 'MESSAGE_ADDED_SUCCESS'

export const addMessage = (request) => {
  return async (dispatch) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
            'Content-Type': 'application/json'
        }})
    const json = await response.json()
    const message = {
      id: json.id,
      subject: json.subject,
      body: json.body,
      read: json.read,
      starred: json.starred,
      labels: json.labels
    }
    dispatch({
      type: MESSAGE_ADDED_SUCCESS,
      message
    })
  }
}
