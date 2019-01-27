import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import { styles } from '../styles';
import { Status } from '../enums';

type PropsType = {
  searchStationStore?: ISearchStationStore;
  departureStore?: IDepartureStore;
};

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

  render() {
    const { searchStationStore, departureStore } = this.props;
    if (!searchStationStore || !departureStore) return null;
    const { results, query, search, status, error } = searchStationStore;
    const { select } = departureStore;
    let items = results.length > 0 ? results : [];
    if (status === Status.ERROR) {
      items = [{ name: error, id: '' }];
    }
    return null;
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
