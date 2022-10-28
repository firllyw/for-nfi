import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getMyCards } from "../../actions/cardActions";
import {CircularProgress, makeStyles, Button} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import CardsTable from '../../components/CardsTable';
import {getUserInfo} from '../../utils/userInfo';
import './style.css';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    title: {
        color: 'white',
        fontSize: '40px',
        fontWeight: 700,
        margin: '80px 0 20px 0',
    },
    tableWrap: {
        border: '1px solid white',
        borderRadius: '20px',
        padding: '10px 30px',
        // height: '300px',
        // overflow: 'auto',
    },
}));    

export default function MyCards() {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = getUserInfo("userInfo");
    const cardData = useSelector((state) => state.getMyCards);
    const {loading: cardsLoading, myCards, error: cardsError} = cardData;

    useEffect(() => {
        if (!user) {
          navigate("/auth");
        }
        else {
          dispatch(getMyCards());
        }
    }, [user]);

    if(cardsLoading || !myCards) {
        return (
            <div className={classes.root}>
                <CircularProgress color="white" size={60} thickness={5}/>
            </div>
        );
    }

    return (
        <div className="myCardsWrap">
            <div className="homeButton">
                <HomeIcon />
                <Button onClick={() => navigate("/")}>Home</Button>
            </div>
            <div className={classes.title}>
                MY CARDS
            </div>
            <div className={classes.tableWrap}>
                <CardsTable cards = {myCards.results}/>
            </div>
        </div>
    );
}