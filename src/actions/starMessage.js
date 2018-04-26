export const TOGGLE_STAR_SUCCESS = 'TOGGLE_STAR_SUCCESS'

export const starMessage = (request) => {
  return async (dispatch) => {
    console.log('request: ', request)
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
        method: 'PATCH',
        body: JSON.stringify(request),
        headers: {
            'Content-Type': 'application/json'
        }})

    dispatch({
      type: TOGGLE_STAR_SUCCESS,
      message: request
    })
  }
}
