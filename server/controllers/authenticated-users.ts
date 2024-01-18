// ------ Imports ------
import { Request, Response, } from 'express' //TS Import
// import { StatusCodes } from "http-status-codes"
// const { BadRequestError, UnauthenticatedError } = require("../errors");

// ------ DUMMY FUNCTION ------
const dummyFunction = async (req: Request, res: Response) => {
    res.json({"result": "OK"})
}

// ------ Exports ------
module.exports = {
    dummyFunction 
}