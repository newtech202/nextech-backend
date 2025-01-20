declare namespace Express {
    export interface Request { }
    export interface Response { }
    export interface NextFunction { }
    export interface CustomError extends Error {
        statusCode?: number;
    }
}
