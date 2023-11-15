// const { statusCodes } = require("http-status-codes");
import { StatusCodes } from "http-status-codes";
const CustomAPIError = require('./custom-api');
class BadRequestError extends CustomAPIError {
    constructor(message: string) {
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

module.exports = BadRequestError