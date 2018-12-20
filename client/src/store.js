/* eslint-disable no-undef,no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};
const middleware = [thunk];

let composition;
if (process.env.NODE_ENV === 'production') {
  composition = compose(
    applyMiddleware(...middleware)
  );
} else {
  composition = compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

export default createStore(rootReducer, initialState, composition);
