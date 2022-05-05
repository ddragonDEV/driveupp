import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    alert: {
        position: "fixed",
        bottom: 0,
        right: 0,
        zIndex: theme.zIndex.drawer + 1000
    }
}));

export { useStyles };
