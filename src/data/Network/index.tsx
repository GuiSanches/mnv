import { FC, useEffect } from "react";
import NetworkApi from './NetworkApi'

const Tester: FC = () => {
    useEffect(() => {

        const networkApi = new NetworkApi()

        networkApi.listDefaultNetworks().then(console.log)
    })

    return <h2>Loadig...</h2>
}

export default Tester