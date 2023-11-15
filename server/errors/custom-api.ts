class CustomAPIError extends Error {
    constructor(message: string) {
        super(message);
    }
}

module.exports = CustomAPIError

/**
 * ! https://www.codeconcisely.com/posts/how-to-handle-errors-in-express-with-typescript/ 
 */