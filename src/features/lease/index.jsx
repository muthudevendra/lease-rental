import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchLeases} from './leaseAction';

import { makeStyles } from '@material-ui/core/styles';


import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paper: {
    marginTop: '20vh',
    padding: theme.spacing(2),
    textAlign: 'center',
    height: '50vh',
    maxHeight: '50vh',
    overflow: 'auto',
    color: theme.palette.text.secondary,
  },
}));

const Lease = ({requestLease, lease}) => {
  const classes = useStyles();

  useEffect(() => {
    const getData = () => requestLease();
    getData();
  }, [requestLease])

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Paper className={classes.paper}>
          <List component="nav" aria-label="secondary mailbox folders">
            {
              lease.leaseData.map(item => (
                <ListItem key={item.id} button component={Link} to={`/lease/${item.id}`}>
                  <ListItemText primary={item.tenant} />
                </ListItem>
              ))
            }
          </List>
        </Paper>
      </Container>
    </React.Fragment>   
  )
};

const mapState = (state) => {
  const { lease } = state;
  return { lease };
};

const mapAction = {
  requestLease: fetchLeases
};

export default connect(
  mapState,
  mapAction
)(Lease);