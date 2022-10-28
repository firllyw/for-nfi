import React from 'react';
import { Avatar, Typography, ImageList, ImageListItem, Card, CardActionArea, CardMedia, CardContent } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    modal: {        
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    paper: {
        width: '1050px',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        textAlign: 'center',
        borderRadius: '20px', 
    },
    avatar: {
        margin: '10px auto',
    },
    imageList: {
      height: 650,
      margin: '36px !important',      
    },
    imageItem: {
        display: 'flex',
        justifyContent: 'center',
    },
    card: {
        maxWidth: 190,
        height: '190px',
        color: 'white',
        borderRadius: '20px',
        boxShadow: '10px 9px 20px -5px #888888',
        margin: '0 auto',
        backgroundColor: 'black',
    },
    media: {
        height: 150,
        borderRadius: '20px',
    },
    content: {
        padding: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 14,
        fontWeight: 400,
    },
  }));
export default function NFTModal({open, handleClose, data, select, selected}) {
    const classes = useStyles();
    return (
    <div>
        <Modal open={open} onClose={handleClose}  className={classes.modal}>
            <div className={classes.paper}>
                    <Avatar className={classes.avatar} src={selected?.image_thumbnail_url} alt="avatar" />
                    <Typography>{selected?.asset_contract.address || ""}</Typography>
                <ImageList rowHeight={260} className={classes.imageList} cols={4}>
                    {data.map((item, index) => (
                    <ImageListItem key={index} onClick = {() => select(item)}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                className={classes.media}
                                        image={item.image_thumbnail_url}
                                        title={item.description}
                                />
                                <CardContent className={classes.content}>
                                    <Typography className={classes.title}>
                                            {item.name}
                                    </Typography>                                
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </ImageListItem>
                    ))}
                </ImageList>
            </div>
        </Modal>
    </div>
        
    )
}