import ActionTypes from '../types'

export const setEmployeeList = (data) => {
  console.log("saving")
  return {
    type: ActionTypes.EMPLOYEELIST,
    payload: data
  };
}
