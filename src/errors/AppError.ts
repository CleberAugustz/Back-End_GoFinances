export default class AppError {

    public readonly message: string;

    public readonly statusCode: number; // código de erro do http

    constructor(message: string, statusCode = 400){
        this.message = message;
        this.statusCode = statusCode;
    }
}