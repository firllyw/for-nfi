import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {CircularProgress, makeStyles} from '@material-ui/core';
import './style.css';
import { getAdminUsers } from '../../actions/adminAction';
import UsersTables from '../../components/UsersTable';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    title: {
        color: 'white',
        fontSize: '40px',
        fontWeight: 700,
        marginBottom: '20px',
    },
    tableWrap: {
        border: '1px solid white',
        borderRadius: '20px',
        padding: '10px 30px',
        width: '100%',
        // height: '300px',
        // overflow: 'auto',
    },
}));    

export default function AdminUsers() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.getAdminUsers);
    const {loading: usersLoading, adminUsers, error: usersError} = userData;
    // const adminSignin = useSelector((state) => state.adminSignin);
    // const { adminInfo: signInAdminInfo } = adminSignin;
    

    useEffect(() => {
        dispatch(getAdminUsers());
    }, [dispatch]);

    if(usersLoading || !adminUsers) {
        return (
            <div className={classes.root}>
                <CircularProgress color="white" size={40} thickness={2}/>
            </div>
        );
    }

    return (
        <div className="adminCardsWrap">
            <div className={classes.title}>
                USERS
            </div>
            <div className={classes.tableWrap}>
                <UsersTables users = {adminUsers.users}/>
            </div>
        </div>
    );
}