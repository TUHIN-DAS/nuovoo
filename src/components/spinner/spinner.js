import React from "react";
import {SpinnerService} from "services/spinner.service";
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Spinner = () => {
  const classes = useStyles();
  const [showSpinner,setShowSpinner] = React.useState(false);
  //const classes = useStyles();
  // subscribing to login service to get identify when to show forgot password modal
  SpinnerService.getLoader().subscribe((canShow) => { console.log(canShow); setShowSpinner(canShow.show)});

  return showSpinner && 
  <Backdrop className={classes.backdrop} open={showSpinner}>
    <CircularProgress variant="indeterminate" color="secondary" />
  </Backdrop>
}

export default Spinner;
