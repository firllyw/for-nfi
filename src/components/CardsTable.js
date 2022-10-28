import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TablePagination from '@material-ui/core/TablePagination';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  tableCell: {
      width: '50vw',
      maxWidth: '500px',
      overflow: 'hidden',
  },
  detail: {
    // maxWidth: '800px',
    display: 'flex',
    padding: '10px 20px'
  },
  nftImg: {
    width: '200px',
    marginRight: '40px',
  }
});


function Row({row}) {
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="center" className={classes.tableCell}>{row.creator}</TableCell>
        <TableCell align="right">{row.createdAt}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
                <div className={classes.detail}>
                    <img src={row.nft_path} alt="nftImg" className={classes.nftImg} />
                    <div>
                        <Typography variant="h6" gutterBottom component="div">
                            NAME : {row.name}
                        </Typography>
                        <Typography variant="h6" gutterBottom component="div">
                            CREATOR : {row.creator}
                        </Typography>
                        <Typography variant="h6" gutterBottom component="div">
                    TOKENID : {row.token_id}
                  </Typography>
                  <Typography variant="h6" gutterBottom component="div">
                            DESCRIPTION :
                        </Typography>
                        <Typography variant="h7" gutterBottom component="div">
                            {row.description}
                        </Typography>
                        <Typography variant="h7" gutterBottom component="div">
                            CREATED : {row.createdAt}
                        </Typography>
                        <Typography variant="h7" gutterBottom component="div">
                            UPDATED : {row.updatedAt}
                        </Typography>                        
                    </div>                    
                </div>          
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CardsTable({cards}) {
    const [page, setPage] = useState(0);    
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    if(cards.length === 0) {
        return (<>
            There is no card.
        </>)
    }

    return (
        <Paper>
            <TablePagination
                rowsPerPageOptions={[3, 5, 10]}
                component="div"
                count={cards.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Name</TableCell>
                        <TableCell align="center">Creator</TableCell>
                        <TableCell align="center">Created</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {cards.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((card, index) => (
                        <Row key={index} row={card} />
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
        </Paper>
    
    );
}
