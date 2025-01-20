
export class ApiMessageResponse extends Error {
    statusCode
    constructor(message: string, statusCode: number) {
        super(message)
        this.statusCode = statusCode
    }

}