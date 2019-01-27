import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import AsyncSelect from 'react-select/lib/Async';
import { createStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

import { Status } from '../enums';

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

const CustomInput = withStyles(styles)(
  ({ classes, innerRef, ...otherProps }: any) => (
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

@inject((rootStore: IRootStore) => ({
  searchStationStore: rootStore.searchStationStore,
  departureStore: rootStore.departureStore,
}))
@observer
export class SearchStations extends Component<PropsType> {
  renderInput = ({ ref, ...inputProps }: React.HTMLProps<HTMLInputElement>) => {
    const { searchStationStore } = this.props;
    return null;
    // <CustomInput
    //   loading={
    //     searchStationStore
    //       ? searchStationStore.status === Status.PENDING
    //       : false
    //   }
    //   {...inputProps}
    //   placeholder="Rechercher une gare de départ"
    // />
  };
  handleInputChange = (newValue: string) => {
    const { searchStationStore } = this.props;
    if (!searchStationStore) return null;
    const { search } = searchStationStore;
    console.log(newValue);

    search(newValue);
  };

  render() {
    const { searchStationStore, departureStore } = this.props;
    if (!searchStationStore || !departureStore) return null;
    const { results, query, search, status, error } = searchStationStore;
    const { select } = departureStore;
    let items = results.length > 0 ? results : [];
    if (status === Status.ERROR) {
      items = [{ name: error, id: '' }];
    }
    return (
      <AsyncSelect
        cacheOptions
        inputValue={query}
        onInputChange={this.handleInputChange}
        components={{ Input: CustomInput }}
        options={items}
      />
    );
    // <Search
    //   width={10}
    //   loading={status === Status.PENDING}
    //   results={items.map(({ name, id }) => ({
    //     title: name,
    //     id,
    //   }))}
    //   value={query}
    //   onSearchChange={(e, { value }) => search(value)}
    //   onResultSelect={(e, { result }) => select(result)}
    // />
  }
}

export default SearchStations;
