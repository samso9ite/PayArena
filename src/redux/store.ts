import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootReducers  } from "./reducers";
import { rootSaga } from "./sagas";

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Mount it on the Store
const store = createStore(rootReducers , applyMiddleware(sagaMiddleware));

// Run the saga
sagaMiddleware.run(rootSaga);

export default store;