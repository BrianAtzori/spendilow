// ------ PACKAGES ------
import axios from "axios";

// ------ ASSETS ------
import { baseURL } from "..";

// ------ DATA ------
const route: string = "/users"

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
        })
        .catch(function (error) {
            console.log(error)
        })
}

const loginSpendilowUser = async function (userCredentials: spendilowUserLogin) {
    axios
        .post(baseURL + route + "/login", userCredentials)
        .then((res) => {
            console.log(res.data);
        })
        .catch(function (error) {
            console.log(error)
        })
}

export {
    signUpNewSpendilowUser,
    loginSpendilowUser
}