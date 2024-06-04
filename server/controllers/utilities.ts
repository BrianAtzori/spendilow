import { Request, Response, } from 'express' //TS Import
import { StatusCodes } from "http-status-codes"
const { BadRequestError, UnauthenticatedError } = require("../errors");

// ------ CHECK SERVER ALIVE ------
const checkServerAlive = async (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({ available: true })
}

module.exports = {
    checkServerAlive
}