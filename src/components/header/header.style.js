import { fade, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    header: {
        backgroundColor : "white",
        boxShadow:"none"
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
      color:"rgb(220, 0, 78)",
      fontWeight:"bold"
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      border: fade("rgb(220, 0, 78)", 0.75) + "2px solid",
      '&:hover': {
        border: fade("rgb(220, 0, 78)", 1) + "2px solid",
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        marginRight:theme.spacing(1),
        width: 'auto',
      }
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color:"rgb(220, 0, 78)"
    },
    inputRoot: {
      color: "rgb(220, 0, 78)",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 600,
        },
      },
    },
    button: {
        marginRight: theme.spacing(1) + "px !important",
        backgroundColor:fade("rgb(220, 0, 78)", 0.75),
        '&:hover': {
            backgroundColor:"rgb(220, 0, 78)"
        }
    },
    avatar: {
        marginRight: theme.spacing(1),
        cursor : "pointer"
    }
  }));
  