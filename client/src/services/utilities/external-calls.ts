import axios from "axios";
// import { apiErrorResponseHandler } from "../general/apiErrorResponseHandler";

const baseURL = import.meta.env.VITE_SPENDILOW_SERVER_URL + import.meta.env.VITE_SPENDILOW_API_VERSION

const checkServerAlive = async function (): Promise<boolean> {
    axios
        .get(baseURL + "/utilities/check-server-alive/")
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