import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Favorite from '@material-ui/icons/Favorite';

const useStyles = makeStyles({
  container: {
    position: 'fixed',
    bottom: '0',
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
  },
  text: {
    marginRight: '25px',
  },
});

const Footer = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <span className={styles.text}>
        Made by Mihai with <Favorite fontSize="small" />
      </span>
    </div>
  );
};

export default Footer;
