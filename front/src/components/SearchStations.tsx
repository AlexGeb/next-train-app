import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';
import { observer, inject } from 'mobx-react';
import { DepartureStore } from '../store/departureStore';

@inject((rootStore: IRootStore) => ({
  searchStationStore: rootStore.searchStationStore,
  departureStore: rootStore.departureStore,
}))
@observer
export class SearchStations extends Component<
  {
    searchStationStore?: ISearchStationStore;
    departureStore?: IDepartureStore;
  },
  any
> {
  render() {
    const { searchStationStore, departureStore } = this.props;
    if (!searchStationStore || !departureStore) return null;
    const { results, query, search } = searchStationStore;
    const { select, stationId } = departureStore;
    return (
      <>
        <Autocomplete
          getItemValue={item => item.name}
          items={results.length > 0 ? results : []}
          renderItem={(item: ISearchResult, isHighlighted) => (
            <div
              key={item.externalCode}
              style={{ background: isHighlighted ? 'lightgray' : 'white' }}
            >
              {item.name}
            </div>
          )}
          value={query}
          onChange={e => search(e.target.value)}
          onSelect={(value, item: ISearchResult) => select(item)}
        />
        {JSON.stringify(stationId)}
      </>
    );
  }
}

export default SearchStations;
