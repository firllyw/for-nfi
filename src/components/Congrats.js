import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import templatImg from '../assets/template.png'
import { Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: '470px',
        '& .MuiPaper-root': {
            backgroundColor: 'transparent !important',
        }
    },
    imageWrap: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid white',
        borderRadius: '16px',
        height: '520px',
        marginBottom: theme.spacing(8),
    },
    templateHeader: {
        font: 'Mont',
        fontWeight: '800',
        fontSize: '48px',
        color: 'white',
    },
    templateSubHeader: {
        font: 'Huben',
        fontWeight: '400',
        fontSize: '18px',
        color: 'white',
        marginBottom: theme.spacing(8),
    },   
    image: {
        transform: 'scale(1.3)',
        width: '200px',
    },
    keepBtn: {
        width: '100%',
        height: '60px',
        backgroundColor: 'white',
        borderRadius: '50px',
        font: 'Mont',
        fontWeight: '800',
        fontSize: '12px',
        '&:hover': {
            opacity: '0.7',
            backgroundColor: 'white',
        },
    },
    viewBtn: {
        width: '100%',
        height: '60px',
        borderRadius: '50px',
        font: 'Mont',
        fontWeight: '800',
        fontSize: '12px',
        color: 'white',
        border: '1px solid white',        
        padding: theme.spacing(1),
        '&:hover': {
            backgroundColor: 'rgba(255,255,255, 0.6)',
        },
    }
  }));
export default function Congrats({card}) {
    const classes = useStyles();

  return (
      <div className={classes.root}>
        <Typography className={classes.templateHeader}>CONGRATS!</Typography>
        <Typography className={classes.templateSubHeader}>You are the new owner of a Meta Slab</Typography>
        <Paper className={classes.imageWrap}>
            <img src={card.nft_path} alt='templateImg' className={classes.image}></img>                               
        </Paper>
        <Grid container spacing={3}>
            <Grid container item xs={6}>
                <Button className={classes.keepBtn}>KEEP SHOPPING</Button>                  
            </Grid>
            <Grid container item xs={6}>
                <Button className={classes.viewBtn}>VIEW IN WALLET</Button>    
            </Grid>            
        </Grid>
      </div>
    
  );
}