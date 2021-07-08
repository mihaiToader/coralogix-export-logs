import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Footer from '../footer/Footer';
import SearchMenu from '../search/SearchMenu';
import FiltersList from '../search/filters/FiltersList';
import SearchActionsBar from "../search/filters/SearchActionsBar";
import useFilters from "../search/filters/useFilters";

const useStyles = makeStyles({
  container: {
    flexGrow: 1,
    padding: '20px',
  },
});

const SearchPage = () => {
  const styles = useStyles();
  const { filters, addFilter, setFilterValue } = useFilters();

  return (
    <>
      <SearchMenu />
      <div className={styles.container}>
        <Grid container spacing={2}>
          <FiltersList filters={filters} setFilterValue={setFilterValue} />
        </Grid>
      </div>
      <SearchActionsBar filters={filters} addFilter={addFilter} />
      <Footer />
    </>
  );
};

export default SearchPage;
