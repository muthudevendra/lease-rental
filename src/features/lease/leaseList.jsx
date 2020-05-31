import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import NavBar from '../../components/navBar/navBar';
import {fetchLeases, getOneLease} from './leaseAction';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    maxWidth: '98%',
  },
  paper: {
    marginTop: '5vh',
    padding: theme.spacing(2),
    height: '70vh',
    maxHeight: '70vh',
    overflow: 'auto',
    color: theme.palette.text.secondary,
  },
  selectedItem: {
    backgroundColor: '#DCDCDC'
  },
  detailHeader: {
    display: 'inline',
    fontWeight: 'bold'
  }
}));

const Lease = ({requestLease, fetchLeaseDataById, lease}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const classes = useStyles();

  // Get lease item list on initial page load
  useEffect(() => {
    const getData = () => requestLease();
    getData();
  }, [requestLease])

  return (
    <React.Fragment>
      <NavBar />
      {
        lease.loading && <LinearProgress color="secondary" />
      }
      <Grid container className={classes.root}  spacing={2}>
        <Grid item sm={3}>
          <Paper className={classes.paper}>
            <Typography id={'leaseWrapper'} variant="h5" className={classes.title}>
              Leases
            </Typography>
            <List>
              {
                lease.leaseData.map(item => (
                  <ListItem className={selectedItem?.id === item.id ? classes.selectedItem : null} key={item.id} button
                    onClick={() => {
                      setSelectedItem(item)
                      fetchLeaseDataById(item.id);
                    }}>
                    <ListItemText primary={item.tenant} />
                  </ListItem>
                ))
              }
            </List>
          </Paper>
        </Grid>
        <Grid item sm={7}>
          <TableContainer component={Paper} className={classes.paper}>
            <Typography variant="h6" className={classes.title}>
                Information
            </Typography>
            {
              lease.selectedLease &&
              <Typography variant="body2" className={classes.title}>
                  Weekly rent amount: ${lease.selectedLease.rent} |
                  Payment frequency: {lease.selectedLease.frequency} |
                  Payment day: {lease.selectedLease.payment_day} 
              </Typography>
            }
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>From</TableCell>
                  <TableCell>To</TableCell>
                  <TableCell align="center">Days</TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lease.selectedLeasePayments.map(lease => (
                  <TableRow key={lease.from}>
                    <TableCell component="th" scope="row">
                      {lease.from}
                    </TableCell>
                    <TableCell>{lease.to}</TableCell>
                    <TableCell align="center">{lease.days}</TableCell>
                    <TableCell align="right">$ {lease.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </React.Fragment>   
  )
};

const mapState = (state) => {
  const { lease } = state;
  return { lease };
};

const mapAction = {
  requestLease: fetchLeases,
  fetchLeaseDataById: getOneLease
};

export default connect(
  mapState,
  mapAction
)(Lease);