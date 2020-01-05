import React from "react";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    link : {
        cursor : "pointer",
        '&:hover' : {
            textDecoration: "underline"
        }
    }
}));

const SoftLink = (props) => {
    const classes = useStyles();
    return <a onClick={props.click} className={classes.link}>{props.label}</a>
}

export default SoftLink;