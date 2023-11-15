import {StatusCodes} from "http-status-codes"
class CustomAPIError extends Error {
    public statusCode: any;
    constructor(message: string) {
        super(message);
    }
}

module.exports = CustomAPIError

/**
 * ? https://www.codeconcisely.com/posts/how-to-handle-errors-in-express-with-typescript/ 
 */