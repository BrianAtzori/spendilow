// ------ PACKAGES ------
import axios from "axios";

// ------ ASSETS ------
import { baseURL } from "..";

// ------ DATA ------
const route: string = "/users"

// ------ SERVICES ------
import { apiErrorResponseHandler } from "../general/apiErrorResponseHandler";

// ------ TYPESCRIPT ------
interface newSpendilowUser {
    email: string,
    password: string,
    savings: number,
    salary: number,
    profileImage: string,
    workfield: string,
    username: string
    isMFAActive: boolean
}

interface spendilowUserLogin {
    email: string,
    password: string,
}

// ------ CALLS ------
const signUpNewSpendilowUser = async function (newSpendilowUser: newSpendilowUser) {
    axios
        .post(baseURL + route + "/new", newSpendilowUser, { withCredentials: true })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .then((res) => {
            switch (newSpendilowUser.isMFAActive) {
                case true:
                    window.location.href = "/auth/mfa";
                    break;
                case false:
                    window.location.href = "/auth/login";
                    break;
                default:
                    window.location.href = "/auth/login";
                    break;
            }

        })
        .catch((error) => {
            apiErrorResponseHandler(error.response.status, error.response.data.errorMessage);
        })
}

const loginSpendilowUser = async function (userCredentials: spendilowUserLogin) {
    axios
        .post(baseURL + route + "/login", userCredentials, { withCredentials: true })
        .then((res) => {
            console.log(res.data);
            switch (res.data.toBeVerified) {
                case 1:
                    window.location.href = "/auth/mfa-verification";
                    break;
                case 0:
                    window.location.href = "/user/dashboard";
                    break;
                default:
                    window.location.href = "/user/dashboard";
                    break;
            }
        })
        .catch((error) => {
            apiErrorResponseHandler(error.response.status, error.response.data.errorMessage);
        })
}

const activateMFA = async function () {
    return axios
        .get(baseURL + route + "/mfa-activation")
        .then((res) => {
            return res.data
        })
        .catch((error) => {
            apiErrorResponseHandler(error.response.status, error.response.data.errorMessage);
        })
}

const verifyMFA = async function (otp: string) {
    axios
        .post(baseURL + route + "/mfa-verification/", { otp })
        .then((res) => {
            switch (res.data.verified) {
                case true:
                    window.location.href = "/user/dashboard"
                    break;
                case false:
                    alert("Codice errato, riprova ad inserire la password temporanea o contatta il supporto!")
                    break;
                default:
                    window.location.href = "/";
                    break;
            }
        })
        .catch((error) => {
            apiErrorResponseHandler(error.response.status, "Codice errato, riprova ad inserire la password temporanea o contatta il supporto!");
        })
}

//TODO: Spostare/Fixare/Rivedere
const dummyAuth = async (): Promise<boolean> => {

    let result: boolean = false

    result = await axios
        .get(baseURL + "/authenticated-users" + "/dummy", { withCredentials: true })
        .then((res) => {
            console.log("LOGIN OK: " + res.data)
            return true
        })
        .catch((error) => {
            apiErrorResponseHandler(error.response.status, "Non siamo riusciti a recuperare una sessione di accesso, se possiedi un account effettua nuovamente il login altrimenti registra un nuovo profilo.");
            window.location.href = "/";
            return false
        })

    return result
}

export {
    signUpNewSpendilowUser,
    loginSpendilowUser,
    activateMFA,
    verifyMFA,
    dummyAuth
}