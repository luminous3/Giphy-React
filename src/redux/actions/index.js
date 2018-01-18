import fetch from 'cross-fetch';

export const REQUEST_ITEMS = 'REQUEST_ITEMS';
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';
export const REQUEST_SEARCH_ITEMS = 'REQUEST_SEARCH_ITEMS';

function requestItems() {
  return {
    type: REQUEST_ITEMS
  };
}

function receiveItems(json) {
  return {
    type: RECEIVE_ITEMS,
    items: json.data,
    receivedAt: Date.now()
  };
}

function requestSearchItems(query) {
  return {
    type: REQUEST_SEARCH_ITEMS,
    query
  };
}

export function fetchTrending() {
  return dispatch => {
    dispatch(requestItems());
    return fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=o0WkAgsV8Yu0S7pjGI1Bk594LxB49hGF&limit=10&rating=G`
    )
      .then(response => response.json())
      .then(json => {
        dispatch(receiveItems(json));
      });
  };
}

export function fetchSearchResults(query) {
  return dispatch => {
    dispatch(requestSearchItems(query));
    return fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=o0WkAgsV8Yu0S7pjGI1Bk594LxB49hGF&q=${query}&limit=25&offset=0&rating=G&lang=en`
    )
      .then(response => response.json())
      .then(json => {
        dispatch(receiveItems(json));
      });
  };
}
