import { createStore, combineReducers, applyMiddleware } from "redux";

import liffReducer from "./reducers/liff";
import authReducer from "./auth/ducks";
import lockerInstancesReducer from "./pages/mylocker/ducks";

import ReduxThunk from "redux-thunk";

const combinedReducers = combineReducers({
  liff: liffReducer,
  authentication: authReducer,
  lockerInstances: lockerInstancesReducer
});

const store = createStore(combinedReducers, applyMiddleware(ReduxThunk));

export default store;
