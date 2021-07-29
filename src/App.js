import React, { useEffect } from "react"
import { Provider, useDispatch } from "react-redux"
import KeplerGl from "kepler.gl"

import { addDataToMap } from "kepler.gl/actions"
import useSwr from "swr"

import store from "./store"

const token =
    "pk.eyJ1IjoidGhlYXNzZXQiLCJhIjoiY2tyb3V1ZTZmMWpsMDJubDdha2lsbXYxeSJ9.A_zwqkPVPGP75uNMSHlzNQ"
const dataUrl =
    "https://gist.githubusercontent.com/leighhalliday/a994915d8050e90d413515e97babd3b3/raw/a3eaaadcc784168e3845a98931780bd60afb362f/covid19.json"

const App = () => {
    return (
        <Provider store={store}>
            <Map />
        </Provider>
    )
}

function Map() {
    const dispatch = useDispatch()
    const { data } = useSwr("covid", async () => {
        const response = await fetch(dataUrl)
        const data = await response.json()
        return data
    })

    useEffect(() => {
        if (data) {
            dispatch(
                addDataToMap({
                    datasets: {
                        info: {
                            label: "COVID-19",
                            id: "covid19",
                        },
                        data,
                    },
                    option: {
                        centerMap: true,
                        readOnly: false,
                    },
                    config: {},
                })
            )
        }
    }, [dispatch, data])

    return (
        <KeplerGl
            id="covid"
            mapboxApiAccessToken={token}
            width={"100%"}
            height={"100%"}
        />
    )
}

export default App
