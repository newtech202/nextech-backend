export class SuccessResponseMessage {
    public message: string;
    public statusCode: number;

    constructor(message: string, statusCode: number = 200) {
        this.message = message;
        this.statusCode = statusCode;
    }
}
