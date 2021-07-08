import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TokenContext from '../context/TokenContext';
import {Link} from "react-router-dom";

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
  const tokenContext = React.useContext(TokenContext);

  return <div className={styles.container}>
    Weeee {tokenContext.token}
    <Link to="/">Go back</Link>
  </div>;
};

export default SearchPage;
