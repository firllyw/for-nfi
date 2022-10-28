import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { Routes, Route, useNavigate } from "react-router-dom";
import {makeStyles} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import AdminCards from './AdminCards';
import AdminUsers from './AdminUsers';
import { getUserInfo } from '../../utils/userInfo';
import { useDispatch } from 'react-redux';
import jwt_decode from "jwt-decode";

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));

function Admin(props) {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = getUserInfo("adminInfo");
    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
        if (!user) {
            navigate("/admin/auth");
        }
        else {
            setUserInfo(jwt_decode(JSON.parse(user).token));
        }
    }, [user, navigate, dispatch]);

    return (
        <div className={classes.root}>
            <Header userInfo = {userInfo} />
            <Sidebar />
            <main className={classes.content}>
                <Toolbar />
                <Routes>
                    <Route path="/users" element={<AdminUsers />} />
                    <Route path="/cards" element={<AdminCards />} />
                </Routes>
            </main>
        </div>
    );
}

export default Admin;