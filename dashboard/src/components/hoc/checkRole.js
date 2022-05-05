import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getItem, removeItem, setItem } from "src/utils/persistentStorage";
import { useInformation } from "../information/useInformation";
import { getMessageToUser, handleSessionExpired } from 'src/helpers/errors';
import { useAlert } from '../alert/useAlert';

const checkRole = (WrappedComponent) => {
    return (props) => {
        const Router = useRouter();
        const { refreshToken } = useInformation();
        const { handleShowAlert } = useAlert();

        const [verified, setVerified] = useState(false);

        useEffect(async () => {
            const accessToken = getItem("token");
            const userInfo = getItem("user");

            if (!accessToken || !userInfo) {
                Router.replace("/login");
            } else {
                if (userInfo?.role !== "admin") {
                    removeItem("token");
                    removeItem("user");
                    Router.replace("/login");
                } else {
                    try {
                        const newSession = await refreshToken(accessToken);
                        setItem("token", newSession.token);
                        setItem("user", newSession.user);
                        setVerified(true);
                    } catch (error) {
                        handleSessionExpired(error, Router);
                        handleShowAlert(getMessageToUser(error), true);
                        Router.replace("/login");
                    }
                }
            }
        }, []);

        if (verified) {
            return <WrappedComponent {...props} />;
        } else {
            return null;
        }
    };
};

export default checkRole;