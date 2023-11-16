// const { StatusCodes } = require("http-status-codes");
import { StatusCodes } from "http-status-codes"
import { Request, Response, RequestHandler, NextFunction } from 'express' //TS Import
const CustomAPIError = require("../errors/custom-api")

const errorHandleMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.StatusCodes).json({ errorMessage: err.message })
    }
}

module.exports = errorHandleMiddleware;