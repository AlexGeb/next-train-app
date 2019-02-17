import React, { useContext, useState } from 'react';
import Select from 'react-select';
import { withTheme, Theme } from '@material-ui/core/styles';
import { Observer, useObservable } from 'mobx-react-lite';
import { observable, flow } from 'mobx';
import { DepartureStore } from '../store/departureStore';
import StoreContext from '../store';
import { Status } from '../enums';
import request from '../services/request';
import { ActionMeta, ValueType } from 'react-select/lib/types';
import moment from 'moment';

type PropsType = {
  searchStationStore?: ISearchStationStore;
  departureStore?: IDepartureStore;
  theme: Theme;
};

const getOptionLabel = (option: ISearchResult) => option.name;
const getOptionValue = (option: ISearchResult) => option.id;

const SearchStations = (props: PropsType) => {
  const { theme } = props;
  const {
    departureStore: { selectedResult, select },
    searchStationStore: { results, status, error, search },
  } = useContext(StoreContext);
  const [query, setQuery] = useState('');

  let items = results.length > 0 ? results : [];
  if (status === Status.ERROR) {
    items = [{ name: error, id: '' }];
  }

  const handleInputChange = (query: string) => {
    console.log('handleInputChange', query);
    setQuery(query);
    
    search(query);
  };

  const handleOnChange = (
    newValue: ValueType<ISearchResult>,
    actionMeta: ActionMeta,
  ) => {
    if (actionMeta.action === 'select-option') {
      if (newValue && !Array.isArray(newValue)) {
        select(newValue);
      }
    }
  };

  const selectStyles = {
    input: (provided, state) => ({
      ...provided,
      color: 'inherit',
      width: '100%',
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    }),
  };

  return (
    <Observer>
      {() => (
        <Select
          styles={selectStyles}
          isLoading={status === Status.PENDING}
          inputValue={query}
          onInputChange={handleInputChange}
          onChange={handleOnChange}
          options={items}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          value={selectedResult}
        />
      )}
    </Observer>
  );
};

export default withTheme()(SearchStations);
