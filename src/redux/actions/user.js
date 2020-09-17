import ActionTypes from '../types'

export const setUser = (data) => {
  console.log("saving")
  return {
    type: ActionTypes.USER,
    payload: data
  };
}
