class HttpError extends Error {
    constructor(message, httpCode) {
        super(message);
        this.code = httpCode;
    }
}

module.exports = HttpError;