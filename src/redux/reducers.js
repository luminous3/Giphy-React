import { REQUEST_TRENDING, RECEIVE_TRENDING } from './actions';

function gifs(
  state = {
    isFetching: false,
    items: [],
    query: ''
  },
  action
) {
  switch (action.type) {
    case REQUEST_TRENDING:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_TRENDING:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.items,
        lastUpdated: action.receivedAt,
        query: ''
      });
    default:
      return state;
  }
}

export default gifs;
