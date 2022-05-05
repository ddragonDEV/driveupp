import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        display: 'flex',
        flexDirection: 'column',
        color: theme.palette.common.white,
        backgroundColor: theme.palette.common.loaderBackground,
        opacity: '0.95 !important',
        zIndex: theme.zIndex.drawer + 1000
    }
}));

export { useStyles };
