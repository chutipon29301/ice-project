import { createStore, combineReducers, applyMiddleware } from "redux";

import liffReducer from "./reducers/liff";

import ReduxThunk from "redux-thunk";

const combinedReducers = combineReducers({ liff: liffReducer });

const store = createStore(combinedReducers, applyMiddleware(ReduxThunk));

export default store;
