// ------ PACKAGES ------
import axios from "axios";

// ------ ASSETS ------
import { baseURL } from "..";

// ------ SERVICES ------
// import { apiErrorResponseHandler } from "../general/apiErrorResponseHandler";

const route: string = "/utilities"

const checkServerAlive = async function (): Promise<boolean> {
    axios
        .get(baseURL + route + "check-server-alive/")
        .then((res) => {
            if (res.data.available) {
                return true
            }
            return false
        })
        .catch(function () {
            return false
        })

    return false
}

export {
    checkServerAlive
}