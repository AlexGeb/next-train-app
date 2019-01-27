import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Select from 'react-select';
import { createStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

import { Status } from '../enums';
import { ActionMeta, ValueType } from 'react-select/lib/types';

type PropsType = {
  searchStationStore?: ISearchStationStore;
  departureStore?: IDepartureStore;
};

const styles = theme =>
  createStyles({
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    },
  });

const CustomInput: React.ComponentType<any> = withStyles(styles)(
  ({ classes, innerRef, innerProps, ...otherProps }: any) => (
    <InputBase
      ref={innerRef}
      placeholder="Search…"
      classes={{
        root: classes.inputRoot,
        input: classes.inputInput,
      }}
      {...otherProps}
    />
  ),
);

const getOptionLabel = (option: ISearchResult) => option.name;
const getOptionValue = (option: ISearchResult) => option.id;

@inject((rootStore: IRootStore) => ({
  searchStationStore: rootStore.searchStationStore,
  departureStore: rootStore.departureStore,
}))
@observer
export class SearchStations extends Component<PropsType> {
  handleInputChange = (query: string) => {
    const { searchStationStore } = this.props;
    if (!searchStationStore) return null;
    const { search } = searchStationStore;
    search(query);
  };

  handleOnChange = (
    newValue: ValueType<ISearchResult>,
    actionMeta: ActionMeta,
  ) => {
    if (actionMeta.action === 'select-option') {
      const { departureStore } = this.props;
      if (!departureStore) return null;
      const { select } = departureStore;
      select(newValue);
    }
  };

  render() {
    const { searchStationStore, departureStore } = this.props;
    if (!searchStationStore || !departureStore) return null;
    const { selectedResult } = departureStore;
    const { results, query, status, error } = searchStationStore;
    let items = results.length > 0 ? results : [];
    if (status === Status.ERROR) {
      items = [{ name: error, id: '' }];
    }
    return (
      <Select
        isLoading={status === Status.PENDING}
        inputValue={query}
        onInputChange={this.handleInputChange}
        onChange={this.handleOnChange}
        components={{ Input: CustomInput }}
        options={items}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        value={selectedResult}
      />
    );
  }
}

export default SearchStations;
