import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  makeStyles
} from "@material-ui/core";
import {
  Person as AccountIcon,
} from "@material-ui/icons";
import { adminSignout } from "../actions/adminAction";

const useStyles = makeStyles((theme) => ({
  logotype: {
    color: "white",
    marginLeft: theme.spacing(2.5),
    marginRight: theme.spacing(2.5),
    fontWeight: 500,
    fontSize: 18,
    whiteSpace: "nowrap",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  appBar: {
    backgroundColor: 'black',
    borderBottom: '1px solid white',
    width: "100vw",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  headerMenu: {
    marginTop: theme.spacing(7),
  },
  headerMenuItem: {
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
  },
  headerMenuButton: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(0.5),
  },
  headerIcon: {
    fontSize: 28,
    color: "rgba(255, 255, 255, 0.35)",
  },
  profileMenu: {
    minWidth: 265,
  },
  profileMenuUser: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
  },
  profileMenuItem: {
    color: theme.palette.text.hint,
  },
  profileMenuIcon: {
    marginRight: theme.spacing(2),
    color: theme.palette.text.hint,
  },
  profileMenuLink: {
    fontSize: 16,
    textDecoration: "none",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));


export default function Header({userInfo}) {
  var classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  var [profileMenu, setProfileMenu] = useState(null);

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>        
        <Typography variant="h6" weight="medium" className={classes.logotype}>
          Metaslabs Admin
        </Typography>
        <div className={classes.grow} />        
        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={e => setProfileMenu(e.currentTarget)}
        >
          <AccountIcon classes={{ root: classes.headerIcon }} />
        </IconButton>
        
        <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography variant="h6" weight="medium">
              {userInfo?.username}
            </Typography>            
          </div>
          <MenuItem
            className={classes.profileMenuItem}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Profile
          </MenuItem>          
          <div className={classes.profileMenuUser}>
            <Typography
              className={classes.profileMenuLink}
              color="primary"
              onClick={() => {dispatch(adminSignout()); navigate("/admin/auth")}}
            >
              Sign Out
            </Typography>
          </div>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
