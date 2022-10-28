import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(30),
        flexGrow: 0.1,
    },
    paper: {
        padding: theme.spacing(3),
        display: 'flex',
        justifyContent: 'center',
        color: theme.palette.text.secondary,
        border: '1px solid white',
        borderRadius: '16px',
        width: theme.spacing(35),
        // height: theme.spacing(40),
    },
    image: {
        position: 'absolute',
        transform: 'translate(0%, -62%)',
        width: '200px',
    },
    content: {
        width: '100%',
        paddingTop: '170px',
    },
    templateHeader: {
        font: 'Huben',
        fontWeight: '600',
        fontSize: '24px',
        color: 'white',
    },
    templateSub: {
        padding: theme.spacing(3),
        },
        templateSubLeft: {
        padding: theme.spacing(1),
        color: 'white',
        fontSize: '14px',
        fontWeight: '500',
    },
    templateSubRight: {
        padding: '0px 20px',
        color: 'white',
        fontSize: '14px',
        lineHeight: '14px',
        fontWeight: '900',
        border: '1px solid white',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
    
    },
    templateBtn: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '50px',
        font: 'Mont',
        fontWeight: '900',
        fontSize: '12px',
        lineHeight: '30px',
        '&:hover': {
            opacity: '0.7',
            backgroundColor: 'white',
        },
    }
  }));
export default function Template({handleClick, templates=[]}) {
    const classes = useStyles();
    if(templates.length === 0) {
        return (<></>)
    }

  return (
      <div className={classes.root}>
        <Grid container spacing={2}>
            {
                templates.map((template, index) => {
                    return (
                        <Grid container justifyContent="center" item xs={12} key={index}>
                            <Paper className={classes.paper}>
                                <img src={template.path} alt='templateImg' className={classes.image}></img>
                                <div className={classes.content}>
                                    <Typography className={classes.templateHeader}>{template.name}</Typography>
                                    <Grid container justifyContent="center" className={classes.templateSub}>
                                    </Grid>                
                                    <Button className={classes.templateBtn} onClick={() => handleClick(index)}>SELECT</Button>
                                </div>              
                            </Paper>
                        </Grid>
                    )
                })
            }
            {/* <Grid container justifyContent="center" item xs={4}>
                <Paper className={classes.paper}>
                    <img src={templatImg} alt='templateImg' className={classes.image}></img>
                    <div className={classes.content}>
                        <Typography className={classes.templateHeader}>STANDARD</Typography>
                        <Grid container justifyContent="center" className={classes.templateSub}>
                            <Typography className={classes.templateSubLeft}>.0064 ETH</Typography>
                            <Typography className={classes.templateSubRight}>$20</Typography>
                        </Grid>                
                        <Button className={classes.templateBtn} onClick={handleClick}>SELECT</Button>
                    </div>              
                </Paper>
            </Grid>
            <Grid container justifyContent="center" item xs={4}>
                <Paper className={classes.paper}>
                    <img src={templatImg} alt='templateImg' className={classes.image}></img>
                    <div className={classes.content}>
                        <Typography className={classes.templateHeader}>STANDARD</Typography>
                        <Grid container justifyContent="center" className={classes.templateSub}>
                            <Typography className={classes.templateSubLeft}>.0064 ETH</Typography>
                            <Typography className={classes.templateSubRight}>$20</Typography>
                        </Grid>                
                        <Button className={classes.templateBtn} onClick={handleClick}>SELECT</Button>
                    </div>              
                </Paper>
            </Grid>
            <Grid container justifyContent="center" item xs={4}>
                <Paper className={classes.paper}>
                    <img src={templatImg} alt='templateImg' className={classes.image}></img>
                    <div className={classes.content}>
                        <Typography className={classes.templateHeader}>STANDARD</Typography>
                        <Grid container justifyContent="center" className={classes.templateSub}>
                            <Typography className={classes.templateSubLeft}>.0064 ETH</Typography>
                            <Typography className={classes.templateSubRight}>$20</Typography>
                        </Grid>                
                        <Button className={classes.templateBtn} onClick={handleClick}>SELECT</Button>
                    </div>              
                </Paper>
            </Grid> */}
        </Grid>
      </div>
    
  );
}