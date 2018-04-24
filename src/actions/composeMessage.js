export const COMPOSE_OPEN = 'COMPOSE_OPEN'
export const COMPOSE_CLOSE = 'COMPOSE_CLOSE'

export const openCompose = () => {
  return async (dispatch) => {
    dispatch({
      type: COMPOSE_OPEN
    })
  }
}

export const closeCompose = () => {
  return async (dispatch) => {
    dispatch({
      type: COMPOSE_CLOSE
    })
  }
}
