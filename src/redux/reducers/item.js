import ActionTypes from '../types'

export default (state = [], action) => {

  switch (action.type) {
    case ActionTypes.ITEMS:
      console.log("saving item")
      return [...action.payload];
    default:
      return state
  }
}