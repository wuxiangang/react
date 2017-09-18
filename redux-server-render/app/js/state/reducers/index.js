import listReducer from './list';
// import itemReducer from './item';

export default function rootReducer(state = {}, action) {
  // const j = {
  //   list: listReducer(state, action),
  //   data: listReducer(state, action)
  // };
  const j = listReducer(state, action);
  return j;
}