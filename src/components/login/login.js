import React from "react";
import {LoginService} from "services/login.service";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import {MessageService} from "services/message.service";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import {useStyles} from "./login.style";
import GTranslateIcon from '@material-ui/icons/GTranslate';
import FacebookIcon from '@material-ui/icons/Facebook';
import IconButton from '@material-ui/core/IconButton';
import SoftLink from 'components/helpers/softlink';
import {SpinnerService} from 'services/spinner.service';

  const responseGoogle = (response) => {
    try {
      let userObj = {};
      userObj.name = response.profileObj.name;
      userObj.email = response.profileObj.email;
      userObj.imageUrl = response.profileObj.imageUrl;
      userObj.id = response.profileObj.googleId;
      userObj.accessToken = response.accessToken;
      userObj.isAuth = true;
      LoginService.setAuthUser(userObj);
      LoginService.closeLoginModal();
    }
    catch(e)
    {
      console.log(e);
      MessageService.setMessage({show:true,message:"Failed to login using google."})
    }
  }

  const responseFacebook = (response) => {
    try {
      let userObj = {};
      userObj.name = response.name;
      userObj.email = response.email;
      userObj.imageUrl = response.picture.data.url;
      userObj.id = response.id;
      userObj.accessToken = response.accessToken;
      userObj.isAuth = true;
      console.log(userObj);
      LoginService.setAuthUser(userObj);
      LoginService.closeLoginModal();
    }
    catch(e)
    {
      console.log(e);
      MessageService.setMessage({show:true,message:"Failed to login using facebook."})
    }
  }

const Login = () => {
  // subscribing to login service to get identify when to show login modal
  LoginService.showLoginModal().subscribe((canShow) => { setLoginForm({...loginForm,showLogin : canShow})});
  const [loginForm,setLoginForm] = React.useState({
    showLogin : false,
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
      }
    }
  }
  );
  
  const classes = useStyles();

  const closeLogin = () => {
    LoginService.closeLoginModal();
  }
  
  const openRegister = () => {
    closeLogin();
    LoginService.openRegisterModal();
  }
  
  const openForgotPassword = () => {
    closeLogin();
    LoginService.openForgotPasswordModal();
  }
  
  const login = ($event) => {
    $event.preventDefault();
    validateFields({...loginForm});
    console.log(loginForm.isFormDirty);
    if(!loginForm.isFormDirty) {
      SpinnerService.setLoader({show:true});
    }
  }
  
  const getGoogleLogin = () => {
      return <GoogleLogin
      clientId="1060310291807-h7a6s5645p9vnlf2l8uc12dihqeedhhg.apps.googleusercontent.com"
      render={renderProps => (
        <IconButton color="secondary" onClick={renderProps.onClick} disabled={renderProps.disabled} aria-label="Google login" component="span">
            <GTranslateIcon />
        </IconButton>
      )}
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  }
  
  const getFacebookLogin = () => {
    return <FacebookLogin
    appId="969119256801288"
    callback={responseFacebook}
    fields="name,email,picture"
    scope="public_profile"
    render={renderProps => (
      <IconButton color="secondary" onClick={renderProps.onClick} disabled={renderProps.disabled} aria-label="Facebook login" component="span">
            <FacebookIcon />
        </IconButton>
    )}
  />
  }

  const setFields = ($event) => {
    let form = {...loginForm};
    let propName = $event.target.id;
    form.fields[propName].value = $event.target.value;
    validateFields(form,propName);
  };

  const validateFields = (form,propName) => {
    form.isFormDirty = false;
    console.log(form,propName);
    for(let field in form.fields)
    {
      if(propName && field !== propName) continue;
      if(loginForm.fields[field].value === "")
      {
        form.isFormDirty = true;
        form.fields[field].error = true;
        form.fields[field].helperText = field + " cannot be blank";
      }
      else
      {
        form.fields[field].error = false;
        form.fields[field].helperText = "";
      }
    }
    console.log(form);
    setLoginForm(form);
  }

  return loginForm.showLogin && 
  <Dialog open={loginForm.showLogin} aria-labelledby="responsive-dialog-title">
    <DialogTitle id="responsive-dialog-title">Log in to nuovoo</DialogTitle>
    <form onSubmit={login}>
    <DialogContent>
      Login using {getGoogleLogin()}{getFacebookLogin()}<br/>
      <TextField onChange={setFields} className={classes.input} helperText={loginForm.fields.username.helperText} error={loginForm.fields.username.error}  id="username" label="Username or email address*" variant="outlined" />
      <br/><br/>
      <TextField onChange={setFields} className={classes.input} helperText={loginForm.fields.password.helperText} error={loginForm.fields.password.error} id="password" type="password" label="Password*" variant="outlined" />
      <br/>
      Not registered ? <Button   onClick={openRegister} color="secondary">Register</Button>
      <br/>
      <SoftLink click={openForgotPassword} label="Forgot password ?"></SoftLink>
    </DialogContent>
    <DialogActions>
      <Button type="submit" color="secondary">Login</Button>
      <Button onClick={closeLogin} color="secondary">Cancel</Button>
    </DialogActions>
    </form>
  </Dialog>
}

export default Login;
