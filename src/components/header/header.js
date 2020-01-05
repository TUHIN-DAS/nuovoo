import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import {useStyles} from './header.style';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Login from 'components/login/login';
import { LoginService } from "services/login.service";
import Register from 'components/register/register';
import ForgotPassword from 'components/forgotpassword/forgotpassword';
import UserProfile from 'components/userprofile/userprofile';

export const Header = () => {
  const classes = useStyles();
  const [userObj,setUserObj] = React.useState({});
  LoginService.getAuthUser().subscribe((userObj) => { setUserObj(userObj)});
  let imageURL = "/static/images/avatar/1.jpg";
  if(userObj && userObj.imageURL)
    imageURL = userObj.imageURL;

  return (
    <div className={classes.root}>
      <AppBar className={classes.header} position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h5" noWrap>
            nuovoo
          </Typography>
         
          <div className={classes.search}>
        
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        {!userObj.isAuth ?  <Button size="medium" color="secondary" aria-label="Login" className={classes.button} onClick={login}>Login</Button> : null}
        {(userObj.isAuth) ? <Avatar onClick={viewProfile} className={classes.avatar} title={userObj.name} src={imageURL} /> : null}
        {(userObj.isAuth) ? <Button size="medium" onClick={logout} color="secondary" aria-label="Logout" className={classes.button}>Logout</Button> : null}
        </Toolbar>
      </AppBar>
      <Login></Login>
      <Register></Register>
      <ForgotPassword></ForgotPassword>
      <UserProfile user={userObj}></UserProfile>
    </div>
  );
}

const login = () => {
  LoginService.openLoginModal();
}

const viewProfile = () => {
  LoginService.openProfileModal();
}

const logout = () => {
  LoginService.logout();
}