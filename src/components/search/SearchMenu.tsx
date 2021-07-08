import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import HideOnScroll from './HideOnScroll';
import coralogixLogo from '../../../assets/coralogix.png';

const useStyles = makeStyles({
  image: {
    height: '70px',
    marginRight: '20px',
  },
});

const SearchMenu = () => {
  const styles = useStyles();
  return (
    <>
      <HideOnScroll>
        <AppBar>
          <Toolbar>
            <img className={styles.image} src={coralogixLogo} alt="Logo" />
            <Typography variant="h6">Download logs from coralogix</Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </>
  );
};

export default SearchMenu;
