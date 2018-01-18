// import { combineReducers } from 'redux';
import { REQUEST_TRENDING, RECEIVE_TRENDING } from './actions';

// function selectedSubreddit(state = 'reactjs', action) {
//   switch (action.type) {
//     case SELECT_SUBREDDIT:
//       return action.subreddit;
//     default:
//       return state;
//   }
// }

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
        items: action.posts,
        lastUpdated: action.receivedAt,
        query: ''
      });
    default:
      return state;
  }
}

// function postsBySubreddit(state = {}, action) {
//   switch (action.type) {
//     case INVALIDATE_SUBREDDIT:
//     case RECEIVE_POSTS:
//     case REQUEST_POSTS:
//       return Object.assign({}, state, {
//         [action.subreddit]: posts(state[action.subreddit], action)
//       });
//     default:
//       return state;
//   }
// }

// const rootReducer = combineReducers({
//   gifs
// });

export default gifs;
