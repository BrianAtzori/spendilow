// ------ PACKAGES ------
import axios from "axios";

// ------ ASSETS ------
import { baseURL } from "..";

// ------ DATA ------

const route: string = "/users"

interface newSpendilowUser {
    email: string,
    password: string,
    savings: number,
    salary: number,
    profileImage: string,
    workfield: string,
    username: string
}

const signUpNewSpendilowUser = async function (newSpendilowUser: newSpendilowUser) {
    axios
    axios
        .post(baseURL + route + "/new", newSpendilowUser)
        .then((res) => {
            console.log(res.data);
        })
        .catch(function (error) {
            console.log(error)
        })
}

export {
    signUpNewSpendilowUser
}