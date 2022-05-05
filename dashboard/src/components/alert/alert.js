import React from 'react';
import PropTypes from 'prop-types';
import AlertMUI from '@mui/material/Alert';
import { Typography } from '@material-ui/core';
import { useStyles } from './styles';
import { Slide } from '@mui/material';

const Alert = (props) => {
    const classes = useStyles();

    return (
        <Slide direction="up" in={props.show} mountOnEnter unmountOnExit>
            <AlertMUI severity={props.isErrorAlert ? "error" : "success"} className={classes.alert}>
                <Typography variant="body">
                    {props.message || "Ha ocurrido un error inesperado"}
                </Typography>
            </AlertMUI>
        </Slide>
    );
};

Alert.propTypes = {
    message: PropTypes.string,
    show: PropTypes.bool,
    isErrorAlert: PropTypes.bool
};

export { Alert };
