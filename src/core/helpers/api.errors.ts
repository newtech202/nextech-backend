export class ApiError extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;

        // Define o protótipo explicitamente para preservar a cadeia de protótipos
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}

export class BadRequestError extends ApiError {
    constructor(message: string) {
        super(message, 400);

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}

export class UnauthorizedError extends ApiError {
    constructor(message: string) {
        super(message, 401);

        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}

export class NotFoundError extends ApiError {
    constructor(message: string) {
        super(message, 404);

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}

export class ForbiddenError extends ApiError {
    constructor(message: string) {
        super(message, 403);

        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
}
