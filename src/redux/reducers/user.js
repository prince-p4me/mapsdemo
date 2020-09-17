import ActionTypes from '../types'

export default (state = null, action) => {

  switch (action.type) {
    case ActionTypes.USER:
      console.log("saving user");
      return action.payload
    default:
      return state
  }
}