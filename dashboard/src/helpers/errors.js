import { removeItem } from "../utils/persistentStorage";

export const getMessageToUser = (bodyError) =>
    !!bodyError?.headerResponse ?
        bodyError?.headerResponse?.message :
        !!bodyError?.message ?
            bodyError.message :
            "Ha ocurrido un error inesperado";

export const handleSessionExpired = (bodyError, nextRouter) => {
    console.log(bodyError);
    if (bodyError?.headerResponse?.code === 401) {
        nextRouter.push("/login");
        removeItem("user");
        removeItem("token");
    }
};

