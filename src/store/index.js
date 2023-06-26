/**
 * @author Vipin Joshi.
 * @since 24-11-2021.
 * @description redux store.
 */
/*import {composeWithDevTools} from 'redux-devtools-extension';*/
import {/*compose,*/ applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import AppReducers from '../reducers';

const store = createStore(
    AppReducers,
    {},
    /*compose( //for production.
        applyMiddleware(thunk),
    )*/
    // composeWithDevTools(applyMiddleware(thunk)) // for development only.
    compose(applyMiddleware(thunk)) // for development only.
);

export default store;
