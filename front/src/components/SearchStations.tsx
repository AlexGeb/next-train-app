import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Autocomplete from 'react-autocomplete';

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
  renderItem = (item: ISearchResult, isHighlighted: boolean) => (
    <div
      key={item.externalCode}
      style={{ background: isHighlighted ? 'lightgray' : 'white' }}
    >
      {item.name}
    </div>
  );

  render() {
    const { searchStationStore, departureStore } = this.props;
    if (!searchStationStore || !departureStore) return null;
    const { results, query, search, status } = searchStationStore;
    const { select, stationId } = departureStore;
    let items = results.length > 0 ? results : [];
    if (status === Status.PENDING) {
      items = [{ name: 'loading...', externalCode: '' }];
    }
    return (
      <div>
        <Autocomplete
          getItemValue={item => item.name}
          items={items}
          renderItem={this.renderItem}
          value={query}
          onChange={e => search(e.target.value)}
          onSelect={(value, item: ISearchResult) => select(item)}
        />
        {JSON.stringify(stationId)}
      </div>
    );
  }
}

export default SearchStations;
