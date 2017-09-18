import Fetch from '../../modules/fetch';

export function fetchList(param) {
    if(!param) return;
    return (dispatch) => {
      return  new Fetch(param)
        .then(json => dispatch({ type: 'FETCH_LIST_SUCCESS', payload: JSON.stringify(json), key: param }));
      }
}