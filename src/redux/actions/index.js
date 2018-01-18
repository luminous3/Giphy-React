import fetch from 'cross-fetch';

export const REQUEST_TRENDING = 'REQUEST_TRENDING';
export const RECEIVE_TRENDING = 'RECEIVE_TRENDING';
// export const REQUEST_SEARCH_RESULTS = 'REQUEST_SEARCH_RESULTS';
// export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';

export function requestTrending() {
  return {
    type: REQUEST_TRENDING
  };
}

function receiveTrending(json) {
  return {
    type: RECEIVE_TRENDING,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
}

// function requestSearchResults(query) {
//   return {
//     type: REQUEST_SEARCH_RESULTS,
//     query
//   };
// }
//
// function receiveSearchResults(query, json) {
//   return {
//     type: RECEIVE_SEARCH_RESULTS,
//     query,
//     posts: json.data.children.map(child => child.data),
//     receivedAt: Date.now()
//   };
// }

function fetchTrending(query) {
  return dispatch => {
    dispatch(requestTrending());
    return fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=o0WkAgsV8Yu0S7pjGI1Bk594LxB49hGF&limit=10&rating=G`
    )
      .then(response => response.json())
      .then(json => dispatch(receiveTrending(json)));
  };
}
//
// function shouldFetchPosts(state, query) {
//   const posts = state.postsBySubreddit[query];
//   if (!posts) {
//     return true;
//   } else if (posts.isFetching) {
//     return false;
//   } else {
//     return posts.didInvalidate;
//   }
// }
//
// export function fetchPostsIfNeeded(query) {
//   return (dispatch, getState) => {
//     if (shouldFetchPosts(getState(), query)) {
//       return dispatch(fetchPosts(query));
//     }
//   };
// }
