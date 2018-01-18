import fetch from 'cross-fetch';

export const REQUEST_TRENDING = 'REQUEST_TRENDING';
export const RECEIVE_TRENDING = 'RECEIVE_TRENDING';
// export const REQUEST_SEARCH_RESULTS = 'REQUEST_SEARCH_RESULTS';
// export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';

function requestTrending() {
  return {
    type: REQUEST_TRENDING
  };
}

function receiveTrending(json) {
  return {
    type: RECEIVE_TRENDING,
    items: json.data,
    receivedAt: Date.now()
  };
}

export function fetchTrending(query) {
  return dispatch => {
    dispatch(requestTrending());
    return fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=o0WkAgsV8Yu0S7pjGI1Bk594LxB49hGF&limit=10&rating=G`
    )
      .then(response => response.json())
      .then(json => {
        dispatch(receiveTrending(json));
      });
  };
}
