import React from "react";
import {LoginService} from "services/login.service";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import {useStyles} from "./forgotpassword.style";

const forgotPasswordDescription = "A new password will be generated and sent to your email.";
const ForgotPassword = () => {

  const [showForgotPassword,setShowForgotPassword] = React.useState(false);
  const classes = useStyles();
  // subscribing to login service to get identify when to show forgot password modal
  LoginService.showForgotPasswordModal().subscribe((canShow) => { console.log(canShow); setShowForgotPassword(canShow)});

  return showForgotPassword && 
  <Dialog open={showForgotPassword} aria-labelledby="responsive-dialog-title">
    <DialogTitle id="responsive-dialog-title">Forgot Password</DialogTitle>
    <DialogContent>
      {forgotPasswordDescription}
      <br/>
      <br/>
      <TextField className={classes.input} required id="email" label="Email address" variant="outlined" />
      <br/>
      Not registered ? <Button   onClick={openRegister} color="secondary">Register</Button>
    </DialogContent>
    <DialogActions>
      <Button color="secondary">Reset</Button>
      <Button onClick={close} color="secondary">Cancel</Button>
    </DialogActions>
  </Dialog>
}

const close = () => {
  LoginService.closeForgotPasswordModal();
}

const openRegister = () => {
    close();
    LoginService.openRegisterModal();
}


export default ForgotPassword;
