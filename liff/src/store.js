import { createStore, combineReducers, applyMiddleware } from "redux";

import liffReducer from "./reducers/liff";
import authReducer from "./auth/ducks";

import ReduxThunk from "redux-thunk";

const combinedReducers = combineReducers({
  liff: liffReducer,
  authentication: authReducer
});

const store = createStore(combinedReducers, applyMiddleware(ReduxThunk));

export default store;
