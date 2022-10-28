import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import metaImg from '../assets/metamask.png';
import coinImg from '../assets/coinbase.png';
import { Typography, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 0.1,
        marginTop: theme.spacing(20),
    },      
    title: {
        padding: theme.spacing(1),
        color: 'white',
        fontSize: '24px',
        fontWeight: '500',
    },
    selectWrap: {
    width: theme.spacing(35),          
    },
    walletBtn: {
        width: '100%',
        cursor: 'pointer',
        borderRadius: '20px',
        backgroundColor: 'white',
        '&:hover': {
            opacity: '0.7',
            backgroundColor: 'white',
        },
    }
  }));
export default function Wallet({handleClick}) {
    const classes = useStyles();

  return (
      <div className={classes.root}>
        <Grid container>
            <Grid container item justifyContent="center" xs={6}>                            
                <Box className={classes.selectWrap}>
                    <img className={classes.walletBtn} src={metaImg} alt='meta' onClick={() => handleClick("metamask")}></img>
                    <Typography className={classes.title}>METAMASK</Typography>    
                </Box>            
            </Grid>
            <Grid container item justifyContent="center" xs={6}>                            
                <Box className={classes.selectWrap}>
                    <img className={classes.walletBtn} src={coinImg} alt='meta' onClick={() => handleClick("coinbase")}></img>
                    <Typography className={classes.title}>COINBASE</Typography>    
                </Box>            
            </Grid>
        </Grid>
      </div>
    
  );
}