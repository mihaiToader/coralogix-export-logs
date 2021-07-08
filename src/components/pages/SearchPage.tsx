import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Footer from '../footer/Footer';
import SearchMenu from '../search/SearchMenu';
import DateTimePicker from '../search/DateTimePicker';
import TextInput from "../search/TextInput";

const useStyles = makeStyles({
  container: {
    flexGrow: 1,
    padding: '20px',
  },
});

const SearchPage = () => {
  const styles = useStyles();

  return (
    <>
      <SearchMenu />
      <div className={styles.container}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <DateTimePicker />
          </Grid>
          <Grid item xs={6}>
            <DateTimePicker />
          </Grid>
          <Grid item xs={3}>
            <TextInput />
          </Grid>
        </Grid>
      </div>
      <Footer />
    </>
  );
};

export default SearchPage;
