import React from "react";
import {LoginService} from "services/login.service";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import {useStyles} from "./register.style";
import {SpinnerService} from "services/spinner.service";
import {isValidUserName,isValidEmail,toFormattedText} from "components/helpers/util";

const Register = () => {

  const [registerForm,setRegisterForm] = React.useState({
    showRegister : false,
    isFormDirty : true,
    fields : {
      username : {
        value : "",
        error : false,
        helperText : ""
      },
      password : {
        value : "",
        error : false,
        helperText : ""
      },
      email : {
        value : "",
        error : false,
        helperText : ""
      }
    }
  });
  const classes = useStyles();

  const setFields = ($event) => {
    let form = {...registerForm};
    let propName = $event.target.id;
    form.fields[propName].value = $event.target.value;
    validateFields(form,propName);
  };

  const validateFields = (form,propName) => {
    form.isFormDirty = false;
    for(let field in form.fields)
    {
      if(propName && field !== propName) continue;
      if(registerForm.fields[field].value === "")
      {
        form.isFormDirty = true;
        form.fields[field].error = true;
        form.fields[field].helperText = toFormattedText(field + " cannot be blank");
      }
      else
      {
        form.fields[field].error = false;
        form.fields[field].helperText = "";
      }
      
      if(registerForm.fields[field].value !== "" && field === "email" && !isValidEmail(registerForm.fields[field].value))
      {
        form.isFormDirty = true;
        form.fields[field].error = true;
        form.fields[field].helperText = "Not a valid email address";
      }

      if(registerForm.fields[field].value !== "" && field === "username" && !isValidUserName(registerForm.fields[field].value))
      {
        form.isFormDirty = true;
        form.fields[field].error = true;
        form.fields[field].helperText = "Not a valid username";
      }

      if(registerForm.fields[field].value !== "" && field === "password" && !(registerForm.fields[field].value.length > 7 && registerForm.fields[field].value.length < 15) )
      {
        form.isFormDirty = true;
        form.fields[field].error = true;
        form.fields[field].helperText = "Password should be between 8 to 14 characters.";
      }

    }
    console.log(form);
    setRegisterForm(form);
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
    validateFields({...registerForm});
    console.log(registerForm.isFormDirty);
    if(!registerForm.isFormDirty) {
      SpinnerService.setLoader({show:true});
    }
  }

  // subscribing to login service to get identify when to show register modal
  LoginService.showRegisterModal().subscribe((canShow) =>  setRegisterForm({...registerForm,showRegister : canShow}))

  return registerForm.showRegister && 
  <Dialog open={registerForm.showRegister} aria-labelledby="responsive-dialog-title">
    <DialogTitle id="responsive-dialog-title">Register for nuovoo</DialogTitle>
    <form onSubmit={register}>
    <DialogContent>
      <TextField onChange={setFields} className={classes.input} helperText={registerForm.fields.username.helperText} error={registerForm.fields.username.error}  className={classes.input} id="username" label="Username*" variant="outlined" />
      <br/><br/>
      <TextField onChange={setFields} className={classes.input} helperText={registerForm.fields.email.helperText} error={registerForm.fields.email.error} className={classes.input} id="email" label="Email address*" variant="outlined" />
      <br/><br/>
      <TextField onChange={setFields} className={classes.input} helperText={registerForm.fields.password.helperText} error={registerForm.fields.password.error} className={classes.input} id="password" type="password" label="Password*" variant="outlined" />
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

export default Register;
