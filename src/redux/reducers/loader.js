import ActionTypes from '../types'

export default (state = false, action) => {

  switch (action.type) {
    case ActionTypes.LOADER:
      console.log("saving LOADER");
      return action.payload
    default:
      return state
  }
}