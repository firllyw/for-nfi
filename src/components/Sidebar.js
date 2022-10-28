import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Sidebar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>      
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button component={Link} to="/admin/users">
              <ListItemIcon><SupervisedUserCircleIcon /></ListItemIcon>
              <ListItemText primary={"Users"} />
            </ListItem>
            <ListItem button component={Link} to="/admin/cards">
                <ListItemIcon><AccountBalanceWalletIcon /></ListItemIcon>
                <ListItemText primary={"Cards"} />
              </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon><AccountCircleIcon /></ListItemIcon>
              <ListItemText primary={"Profile"} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
}
