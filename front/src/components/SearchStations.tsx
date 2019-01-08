import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';
import { observer, inject } from 'mobx-react';

@inject((rootStore: IRootStore) => ({
  searchStationStore: rootStore.searchStationStore,
}))
@observer
export class SearchStations extends Component<
  { searchStationStore?: ISearchStationStore },
  any
> {
  render() {
    const { searchStationStore } = this.props;
    if (!searchStationStore) return null;
    const {
      results,
      query,
      search,
      select,
      selectedResult,
    } = searchStationStore;
    return (
      <>
        <Autocomplete
          getItemValue={item => item.name}
          items={results}
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
        {JSON.stringify(selectedResult)}
      </>
    );
  }
}

export default SearchStations;
