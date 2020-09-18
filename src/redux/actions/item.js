import ActionTypes from '../types'

export const setItemList = (data) => {
  console.log("saving")
  return {
    type: ActionTypes.ITEMS,
    payload: data
  };
}
