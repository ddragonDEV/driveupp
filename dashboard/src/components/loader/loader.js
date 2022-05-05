import React from 'react';
import PropTypes from 'prop-types';
import { Box, Backdrop, CircularProgress, Typography } from '@material-ui/core';
import { useLoader } from './useLoader';
import { useStyles } from './styles';

const Loader = (props) => {
    const { children, topText, bottomText } = props;
    const classes = useStyles();
    const { show, texts } = useLoader();

    const textRender = (text) =>
        text ? (
            <Box m={4}>
                <Typography variant="h5">{text}</Typography>
            </Box>
        ) : null;

    return (
        <Backdrop open={show || false} className={classes.backdrop}>
            {children ? (
                children
            ) : (
                <>
                    {textRender(topText || texts.topText)}
                    <CircularProgress color="inherit" size={56} />
                    {textRender(bottomText || texts.bottomText)}
                </>
            )}
        </Backdrop>
    );
};

Loader.propTypes = {
    topText: PropTypes.string,
    bottomText: PropTypes.string,
    children: PropTypes.node
};

export { Loader };
