import * as types from "../actions/actionTypes";
import initialState from "./initialState";

/*determina si el tipo de accion finaliza en _SUCCESS
Remember: an action can be handled by multiple reducers
*/
function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}
export default function apiCallStatusReducer(
  state = initialState.apiCallsInProgress,
  action
) {
  if (action.type == types.BEGIN_API_CALL) {
    return state + 1; //incrementaremos el numero de llamadas en 1
  } else if (actionTypeEndsInSuccess(action.type)) {
    return state - 1;
  }

  return state;
}
