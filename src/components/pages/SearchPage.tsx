import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },

});

const SearchPage = () => {
  const styles = useStyles();

  return <div className={styles.container}>
    Weeee asd
    <Link to="/">Go back</Link>
  </div>;
};

export default SearchPage;
