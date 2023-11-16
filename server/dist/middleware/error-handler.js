"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomAPIError = require("../errors/custom-api");
const errorHandleMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.StatusCodes).json({ errorMessage: err.message });
    }
};
module.exports = errorHandleMiddleware;
