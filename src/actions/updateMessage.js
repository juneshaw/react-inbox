export const UPDATE_MESSAGE_SUCCESS = 'UPDATE_MESSAGE_SUCCESS'

export const updateMessage = (request) => {
  return async (dispatch) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
        method: 'PATCH',
        body: JSON.stringify(request),
        headers: {
            'Content-Type': 'application/json'
        }})
    
    dispatch({
      type: UPDATE_MESSAGE_SUCCESS,
      message: request
    })
  }
}
