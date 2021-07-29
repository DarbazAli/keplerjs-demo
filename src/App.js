import React from "react"
import { Provider } from "react-redux"
import store from "./store"

const App = () => {
    return (
        <Provider store={store}>
            <Map />
        </Provider>
    )
}

const Map = () => {
    return <h3>I'm a map</h3>
}

export default App
