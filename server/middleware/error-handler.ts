const { statusCodes } = require("http-status-codes");
import { Request, Response, RequestHandler, NextFunction } from 'express' //TS Import

const errorHandleMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ errorMessage: err.message })
    }
}

module.exports = errorHandleMiddleware;