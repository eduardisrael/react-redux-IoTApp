import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadAuthorSuccess(authors) {
  return { type: types.LOAD_AUTHOR_SUCCESS, authors };
}

/*thunk(middleware)*/
export function loadAuthors() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return authorApi
      .getAuthors()
      .then(authors => {
        dispatch(loadAuthorSuccess(authors));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}