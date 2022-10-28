import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import templatImg from '../assets/template.png';
import { Typography, Button, Box, Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8),
        flexGrow: 1,
    },
    leftWrap: {
        width: '100%',
    },
    rightWrap: {
        width: '100%',
        padding: theme.spacing(3),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid white',
        borderRadius: '16px',
        maxWidth: '280px',
        height: '400px',
    },
    name: {
        border: '1px solid white',
        borderRadius: '16px',
        color: 'white',
        width: 'calc(100% - 32px)',
        height: '40px',
        backgroundColor: 'black',
        padding: '8px 16px',
        marginBottom: theme.spacing(2),
    },
    templateHeader: {
        font: 'Huben',
        fontWeight: '800',
        fontSize: '24px',
        color: 'white',
    },
    templateSubHeader: {
        font: 'Huben',
        fontWeight: '400',
        fontSize: '18px',
        color: 'white',
        marginBottom: theme.spacing(8),
    },
    browse: {
        padding: theme.spacing(2),
        display: 'flex',
        width: 'calc(100% - 32px)',
        alignItems: 'center',
        border: '1px solid white',
        borderRadius: '16px',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(3),
    },
    browseBtn: {
        width: '180px',
        height: '40px',
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
    nftBtn: {
        width: '100%',
        height: '73px',
        backgroundColor: 'white',
        borderRadius: '50px',
        font: 'Mont',
        fontWeight: '800',
        fontSize: '24px',
        padding: theme.spacing(1),
        '&:hover': {
            opacity: '0.7',
            backgroundColor: 'white',
        },
    }
  }));
export default function NFT({handleClick, handleModal, selected, setDisplayName}) {
    const classes = useStyles();

  return (
      <div className={classes.root}>
        <Typography className={classes.templateHeader}>SELECT THE NFTS YOU WOULD LIKE TO GRADE</Typography>
        <Typography className={classes.templateSubHeader}>Don't worry, this will <b>not</b> burn your nfts.</Typography>
        <Grid container spacing={3}>
            <Grid container item xs={8}>
                <Box className={classes.leftWrap}>
                    <input className={classes.name} id="name" placeholder="Enter desired display name" onChange={(e) => setDisplayName(e.target.value)}/>
                    <Box className={classes.browse}>
                        <Grid container alignItems="center">
                              <Avatar alt="avatar" src={selected?.image_thumbnail_url} />
                              <span>{selected?.asset_contract.address || ""}</span>
                        </Grid>
                        <Button className={classes.browseBtn} onClick={handleModal}>BROWSE NFTS</Button>
                    </Box>
                    <Button className={classes.nftBtn} onClick={handleClick}>MINT YOUR GRADE</Button>    
                </Box>                
            </Grid>
            <Grid container item xs={4}>
                <Paper className={classes.rightWrap}>
                    <img src={templatImg} alt='templateImg' className={classes.image}></img>                               
                </Paper>
            </Grid>            
        </Grid>
      </div>
    
  );
}