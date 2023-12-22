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
        .post(baseURL + route + "/new", newSpendilowUser)
        .then((res) => {
            console.log(res.data);
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
        .catch(function (error) {
            apiErrorResponseHandler(error.response.status);
        })
}

const loginSpendilowUser = async function (userCredentials: spendilowUserLogin) {
    axios
        .post(baseURL + route + "/login", userCredentials)
        .then((res) => {
            console.log(res.data);
            window.location.href = "/user/dashboard";
        })
        .catch(function (error) {
            apiErrorResponseHandler(error.response.status);
        })
}

export {
    signUpNewSpendilowUser,
    loginSpendilowUser,
}