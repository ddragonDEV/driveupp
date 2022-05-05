import { HttpError } from "routing-controllers";

export class PersonalizedError extends HttpError {
    constructor(message: string) {
        super(411, message);
    }
}
