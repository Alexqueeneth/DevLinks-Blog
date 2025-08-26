export class BaseError extends Error {
    constructor(message, status = 500){
        super(message);
        this.status = status;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }

    formatZodErrors(errors){
        return errors.map(error => ({
            field: error.path[0],
            message: error.message,
        }));
    }

    toResponse(){
        return {
            success: false,
            status: this.status,
            message: this.message,
            name: this.name,
        }
    }
}

export class NotFoundError extends BaseError {
    constructor(message){
        super(message, 404);
    }
}

export class BadRequestError extends BaseError {
    constructor(message){
        super(message, 400);
    }
}

export class UnauthenticatedError extends BaseError {
    constructor(message){
        super(message, 401);
    }
}

export class ForbiddenError extends BaseError {
    constructor(message){
        super(message, 403);
    }
}

export class ConflictError extends BaseError {
    constructor(message){
        super(message, 409);
    }
}

export class InternalServerError extends BaseError {
    constructor(message){
        super(message, 500);
    }
}

export class ValidationError extends BaseError {
    constructor(message, errors){
        super(message, 400);
        this.errors = this.formatZodErrors(errors);
    }

    toResponse(){
        return {
            success: false,
            status: this.status,
            message: this.message,
            errors: this.errors,
        }
    }
}