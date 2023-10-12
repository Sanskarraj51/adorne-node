class HttpException extends Error {
    constructor(http_code, message) {
        super();
        this.http_code = http_code;
        this.message = message;

    }

}

class BadRequestException extends HttpException {
    constructor(message) {
        super(400, message)
    }
}
class AuthRequiredException extends HttpException {
    constructor(message = "Auth Required") {
        super(403, message)
    }
}
class InvalidAuthException extends HttpException {
    constructor(message = "Unauthorized") {
        super(403, message)
    }
}
module.exports = {
    HttpException,
    AuthRequiredException,
    BadRequestException,
    InvalidAuthException,
}