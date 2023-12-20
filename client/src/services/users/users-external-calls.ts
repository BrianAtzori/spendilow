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
            window.location.href = "/auth/login";
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

const verifyCaptcha = async function (token: string) {
    try {
        // Sending secret key and response token to Google Recaptcha API for authentication.
        const response = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${import.meta.env.VITE_CAPTCHA_SITE_KEY}&response=${token}`
        );
        // Check response status and send back to the client-side
        if (response.data.success) {
            alert("Human 👨 👩");
        } else {
            alert("Robot 🤖");
        }
    } catch (error) {
        // Handle any errors that occur during the reCAPTCHA verification process
        alert(error);
    }
}

export {
    signUpNewSpendilowUser,
    loginSpendilowUser,
    verifyCaptcha
}