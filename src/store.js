import { createStore, applyMiddleware, combineReducers } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import keplerGlReducer from "kepler.gl/reducers"
import { taskMiddleware } from "react-palm/tasks"

const initialState = {}

const reducer = combineReducers({
    keplerGl: keplerGlReducer,
})

export default createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(taskMiddleware))
)
