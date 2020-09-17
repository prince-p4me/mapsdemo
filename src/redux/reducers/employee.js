import ActionTypes from '../types'

export default (state = null, action) => {

  switch (action.type) {
    case ActionTypes.EMPLOYEELIST:
      return action.payload
    default:
      return state
  }
}