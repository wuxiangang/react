const initialState = {};

export default function listReducer(state = initialState, action) {
  let payload = {};
  if (action.key) payload[action.key] = JSON.parse(action.payload);
  switch(action.type) {
  case 'FETCH_LIST_SUCCESS':  return Object.assign({},state,payload) ;
  // case 'FETCH_ITEM_SUCCESS':  return Object.assign({},state,payload) ;
  default: return state;
  }
}