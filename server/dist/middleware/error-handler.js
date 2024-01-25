"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { StatusCodes } = require("http-status-codes");
const custom_api_1 = __importDefault(require("../errors/custom-api"));
const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof custom_api_1.default) {
        return res.status(err.statusCode).json({ errorMessage: err.message });
    }
};
module.exports = errorHandlerMiddleware;
