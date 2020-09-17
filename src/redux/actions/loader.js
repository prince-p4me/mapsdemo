import ActionTypes from '../types'

export const setLoading = (data) => {
  console.log("saving")
  return {
    type: ActionTypes.LOADER,
    payload: data
  };
}
