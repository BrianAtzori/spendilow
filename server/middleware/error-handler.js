const { StatusCodes } = require("http-status-codes");
import CustomAPIError from "../errors/custom-api";

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ errorMessage: err.message });
  }
};

module.exports = errorHandlerMiddleware;