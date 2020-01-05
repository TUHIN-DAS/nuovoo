import React from "react";
import {LoginService} from "services/login.service";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import {useStyles} from "./userprofile.style";
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteForever from '@material-ui/icons/DeleteForever';

const UserProfile = (props) => {

  const [showProfile,setShowProfile] = React.useState(false);
  const classes = useStyles();
  // subscribing to login service to get identify when to show profile modal
  LoginService.showProfileModal().subscribe((canShow) => { setShowProfile(canShow)});

  return showProfile && 
  <Dialog open={showProfile} aria-labelledby="responsive-dialog-title">
    <DialogContent>
        <center>
    <Avatar className={classes.avatar} alt="" src={props.user.imageURL} />
    <h4>{props.user.name}<br/>{props.user.email} </h4>
    <IconButton title="Edit Profile" color="secondary" component="span">
          <EditIcon />
    </IconButton>
    <IconButton title="Delete Account" color="secondary" component="span">
          <DeleteForever />
    </IconButton>
    <IconButton title="Change Password" color="secondary" component="span">
          <VpnKeyIcon />
    </IconButton>
    <br/>
    </center>
    <i>Hi I am a software professional loves to blog. I usually do swimming and trekking when not working.</i> 
    <br/>
    </DialogContent>
    <DialogActions>
      <Button color="secondary">Save</Button>
      <Button onClick={closeProfile} color="secondary">Cancel</Button>
    </DialogActions>
  </Dialog>
}

const closeProfile = () => {
  LoginService.closeProfileModal();
}

export default UserProfile;
