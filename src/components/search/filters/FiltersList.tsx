import React from 'react';
import Grid from '@material-ui/core/Grid';
import Filter, { FilterType } from './Filter';
import DateTimePicker from '../DateTimePicker';
import TextInput from '../TextInput';

type Props = {
  filters: Filter[];
  setFilterValue: (name: string, value: any) => void;
};

const FiltersList = ({ filters, setFilterValue }: Props) => {
  return filters.map((filter: Filter) => {
    if (filter.type === FilterType.RANGE) {
      return (
        <React.Fragment key={filter.name}>
          <Grid item xs={6}>
            <DateTimePicker
              onChange={(value) => setFilterValue(filter.name, [null, value])}
              label={filter.getLabel()[0]}
              defaultValue={filter.getValue()[0]}
            />
          </Grid>
          <Grid item xs={6}>
            <DateTimePicker
              onChange={(value) => setFilterValue(filter.name, [value, null])}
              label={filter.getLabel()[1]}
              defaultValue={filter.getValue()[1]}
            />
          </Grid>
        </React.Fragment>
      );
    }
    return (
      <Grid item xs={3} key={filter.name}>
        <TextInput
          label={filter.label}
          defaultValue={filter.getValue()}
          onChange={(value) => setFilterValue(filter.name, value)}
        />
      </Grid>
    );
  });
};

export default FiltersList;
