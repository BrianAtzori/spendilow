"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomAPIError extends Error {
    constructor(message) {
        super(message);
    }
}
module.exports = CustomAPIError;
/**
 * ? https://www.codeconcisely.com/posts/how-to-handle-errors-in-express-with-typescript/
 */ 
