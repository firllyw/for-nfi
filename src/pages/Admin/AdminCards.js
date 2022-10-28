import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {CircularProgress, makeStyles} from '@material-ui/core';
import CardsTable from '../../components/CardsTable';
import './style.css';
import { getAdminCards } from '../../actions/adminAction';

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
        // height: '300px',
        // overflow: 'auto',
    },
}));    

export default function AdminCards() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const cardData = useSelector((state) => state.getAdminCards);
    const {loading: cardsLoading, adminCards, error: cardsError} = cardData;

    useEffect(() => {
        dispatch(getAdminCards());
    }, [dispatch]);

    if(cardsLoading || !adminCards) {
        return (
            <div className={classes.root}>
                <CircularProgress color="white" size={40} thickness={2}/>
            </div>
        );
    }

    return (
        <div className="adminCardsWrap">
            <div className={classes.title}>
                CARDS
            </div>
            <div className={classes.tableWrap}>
                <CardsTable cards = {adminCards.cards}/>
            </div>
        </div>
    );
}