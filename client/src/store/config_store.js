import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import userReducer from '../reducer/user_reducer.js'


export default () => {
    // Store creation
    const store = createStore(
        combineReducers({
            user: userReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

    return store
}