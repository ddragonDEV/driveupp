import { Request } from "express";

export const buildBackendUrl = (request: Request, endpoint?: string, endpointParam?: string) => {
    return `${ request.protocol }://${ request.headers.host }${ endpoint ? "/" + endpoint : "" }${ endpoint && endpointParam ? "/" + endpointParam : ""
        }`;
};
