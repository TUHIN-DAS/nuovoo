import React from "react";
import {LoginService} from "services/login.service";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import {useStyles} from "./register.style";

const Register = () => {

  const [showRegister,setShowRegister] = React.useState(false);
  const classes = useStyles();
  // subscribing to login service to get identify when to show register modal
  LoginService.showRegisterModal().subscribe((canShow) => { setShowRegister(canShow)});

  return showRegister && 
  <Dialog open={showRegister} aria-labelledby="responsive-dialog-title">
    <DialogTitle id="responsive-dialog-title">Register for nuovoo</DialogTitle>
    <form onSubmit={register}>
    <DialogContent>
      <TextField pattern="^[a-zA-Z0-9_.-]*$" className={classes.input} required id="username" label="Username" variant="outlined" />
      <br/><br/>
      <TextField className={classes.input} required id="email" label="Email address" variant="outlined" />
      <br/><br/>
      <TextField className={classes.input} required id="password" type="password" label="Password" variant="outlined" />
      <br/>
      Already registered ? <Button onClick={openLogin} color="secondary">Login</Button>
    </DialogContent>
    <DialogActions>
      <Button type="submit" color="secondary">Register</Button>
      <Button onClick={closeRegister} color="secondary">Cancel</Button>
    </DialogActions>
    </form>
  </Dialog>
}

const closeRegister = () => {
  LoginService.closeRegisterModal();
}

const openLogin = () => {
  closeRegister();
  LoginService.openLoginModal();
}

const register = ($event) => {
  $event.preventDefault();
}

export default Register;
