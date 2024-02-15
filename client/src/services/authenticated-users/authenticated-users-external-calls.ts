// // ------ PACKAGES ------
// import axios from "axios";

// // ------ ASSETS ------
// import { baseURL } from "..";

// // ------ DATA ------
// const route: string = "/authenticated-users"

// // ------ SERVICES ------
// import { apiErrorResponseHandler } from "../general/apiErrorResponseHandler";

// //TODO: Spostare/Fixare/Rivedere
// // const dummyAuth = async (): Promise<boolean> => {

// //     let result: boolean = false

// //     result = await axios
// //         .get(baseURL + "/authenticated-users" + "/dummy", { withCredentials: true })
// //         .then((res) => {
// //             console.log("LOGIN OK: " + res.data)
// //             return true
// //         })
// //         .catch((error) => {
// //             apiErrorResponseHandler(error.response.status, "Non siamo riusciti a recuperare una sessione di accesso, se possiedi un account effettua nuovamente il login altrimenti registra un nuovo profilo.");
// //             window.location.href = "/";
// // //             return false
// //         })

// //     return result
// // }
