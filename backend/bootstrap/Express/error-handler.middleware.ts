import { Middleware, ExpressErrorMiddlewareInterface } from "routing-controllers";
import { Service } from "typedi";
import { getValidationErrors, httpErrorMessage } from "./http-errors.helper";

@Service()
@Middleware({ type: "after" })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
    error(error: any, request: any, response: any, next: (err?: any) => any): void {
        return response.send({
            headerResponse: {
                code: error?.httpCode || 500,
                message: !!error?.httpCode && !!error?.message && error?.httpCode !== 400
                    && error?.httpCode !== 403 ?
                    error?.message : httpErrorMessage(error?.httpCode) ||
                    httpErrorMessage(error?.httpCode),
                validations: getValidationErrors(error?.errors)
            },
            payload: {}
        });
    }

}