// const { statusCodes } = require("http-status-codes");
import { StatusCodes } from "http-status-codes"
const CustomAPIError = require('./custom-api');

class NotFoundError extends CustomAPIError {
    constructor(message: string) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}

module.exports = NotFoundError