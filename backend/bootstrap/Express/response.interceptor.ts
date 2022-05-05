import { Action, Interceptor, InterceptorInterface } from "routing-controllers";
import { Service } from "typedi";

@Service()
@Interceptor()
export class ResponseInterceptor implements InterceptorInterface {
    intercept(action: Action, result: any) {
        if (JSON.stringify(result)) {
            return action.response.send({
                headerResponse: {
                    code: 200,
                    message: "Operación exitosa"
                },
                payload: result
            });
        } else {
            throw new Error("Ha ocurrido un error inesperado");
        }
    }

}