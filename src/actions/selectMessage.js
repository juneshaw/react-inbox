export const SELECT_MESSAGE_SUCCESS = 'SELECT_MESSAGE_SUCCESS'

export const selectMessage = (request) => {
  return (dispatch) => {

    dispatch({
      type: SELECT_MESSAGE_SUCCESS,
      message: request
    })
  }
}
