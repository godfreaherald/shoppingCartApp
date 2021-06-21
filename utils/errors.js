class GeneralError extends Error {
    constructor(message) {
        super();
        this.message = message;
    }

    getCode() {
        if (this instanceof BadRequest) {
            return 400;
        }
        if (this instanceof UnauthorisedRequest) {
            return 401;
        }
        if (this instanceof ConnectionFailed) {
            return 403;
        }
        if (this instanceof InsufficientStock) {
            return 400;
        }

        if (this instanceof NotFound) {
            return 404;
        }
        return 500;
    }
}

class BadRequest extends GeneralError {
    constructor(message) {
        super(message);
    }
}
class UnauthorisedRequest extends GeneralError {
    constructor(message) {
        super(message);
    }
}

class NotFound extends GeneralError {
    constructor(message) {
        super(message);
    }
}

class InsufficientStock extends GeneralError {
    constructor(message) {
        super(message);
    }
}

class ConnectionFailed extends GeneralError {
    constructor(message) {
        super(message);
    }
}

module.exports = {
    GeneralError,
    BadRequest,
    InsufficientStock,
    UnauthorisedRequest,
    NotFound,
    ConnectionFailed
};
