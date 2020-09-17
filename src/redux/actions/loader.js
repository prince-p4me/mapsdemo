import ActionTypes from '../types'

export const setLoading = (data) => {
  console.log("saving")
  return {
    type: ActionTypes.USER,
    payload: data
  };
}
