import { REQUEST_ITEMS, RECEIVE_ITEMS, REQUEST_SEARCH_ITEMS } from './actions';

function gifs(
  state = {
    isFetching: false,
    items: [],
    query: ''
  },
  action
) {
  switch (action.type) {
    case REQUEST_ITEMS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_ITEMS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.items,
        lastUpdated: action.receivedAt
      });
    case REQUEST_SEARCH_ITEMS:
      return Object.assign({}, state, {
        isFetching: true,
        query: action.query
      });
    default:
      return state;
  }
}

export default gifs;
