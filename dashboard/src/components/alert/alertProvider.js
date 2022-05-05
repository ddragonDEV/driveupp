import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { AlertContext } from './alertContext';
import { Alert } from "./alert";

const AlertProvider = (props) => {
    const { children } = props;
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("Ha ocurrido un error inesperado");
    const [isErrorAlert, setIsErrorAlert] = useState(false);

    const handleShowAlert = (message, isError) => {
        setMessage(message);
        setShow(true);
        setIsErrorAlert(isError);

        clearTimeout(notificationTimer);
        const notificationTimer = setTimeout(() => setShow(false), 7000);
    };

    const contextValue = useMemo(
        () => ({
            show,
            handleShowAlert
        }),
        [show, message]
    );

    return (
        <AlertContext.Provider value={contextValue}>
            <Alert show={show} message={message} isErrorAlert={isErrorAlert} />
            {children}
        </AlertContext.Provider>
    );
};

AlertProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export { AlertProvider };
