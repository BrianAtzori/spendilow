"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const { statusCodes } = require("http-status-codes");
const http_status_codes_1 = require("http-status-codes");
const CustomAPIError = require('./custom-api');
class NotFoundError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = http_status_codes_1.StatusCodes.NOT_FOUND;
    }
}
module.exports = NotFoundError;