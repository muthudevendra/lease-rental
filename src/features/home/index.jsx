import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {getLeaseApi} from '../../api/lease';

const Home = () => {

  useEffect(() => {
    const getData = async() => {
      try {
        const data = await getLeaseApi();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    
    getData();
  }, [])

  return (
    <div>
      <p>Home Page</p>
      <Link to="/lease">Lease</Link>
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </div>
  )
};

export default Home;