// const { statusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');
import {StatusCodes} from "http-status-codes"

class UnauthenticatedError extends CustomAPIError {
    constructor(message: string) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

module.exports = UnauthenticatedError;